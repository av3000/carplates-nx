// TODO: move constants and helper functions to their dedicated dir/create shared libs

import {
  Carplate,
  CarplateParameters,
  ErrorResponse,
  PaginatedData,
  PaginatedList,
  PaginationRange,
  ErrorResponseName,
  StatusCode,
} from '../types';

const _db = require('../models');
const Carplate = _db.carplates;
const Op = _db.Sequelize.Op;

const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;
const DEFAULT_PAGE = 0;
const DEFAULT_ITEMS_PER_PAGE = 3;

const validateCarplateGeneralFields = ({
  plate_name,
  owner,
}: CarplateParameters): ErrorResponse | null => {
  const plateFormatError = validatePlateFormat(plate_name);
  const plateLengthError = validatePlateLength(plate_name);
  const ownerError = owner ? validateOwner(owner) : null;

  if (plateLengthError) {
    return plateLengthError;
  }

  if (plateFormatError) {
    return plateFormatError;
  }

  if (ownerError) {
    return ownerError;
  }

  return null;
};

const validateCarplateCreate = (
  carplateCreateParameters: CarplateParameters
): ErrorResponse | null => {
  const fieldsMissingError = validateIfAnyFieldsMissing(
    carplateCreateParameters
  );

  if (fieldsMissingError) {
    return fieldsMissingError;
  }

  const generalFieldsError = validateCarplateGeneralFields(
    carplateCreateParameters
  );

  if (generalFieldsError) {
    return generalFieldsError;
  }

  return null;
};

const validateCarplateUpdate = (
  carplateParameters: CarplateParameters
): ErrorResponse | null => {
  const generalFieldsError = validateCarplateGeneralFields(carplateParameters);
  const noFieldsError = validateIfNoFieldsProvided(carplateParameters);

  if (noFieldsError) {
    return noFieldsError;
  }

  if (generalFieldsError) {
    return generalFieldsError;
  }

  return null;
};

const validateIfAnyFieldsMissing = (
  carplateCreateParameters: CarplateParameters
): ErrorResponse | null => {
  const missingFields = [];

  if (!carplateCreateParameters.plate_name) {
    missingFields.push('plate_name');
  }

  if (!carplateCreateParameters.owner) {
    missingFields.push('owner');
  }

  return missingFields.length > 0
    ? {
        error: {
          name: ErrorResponseName.MissingFields,
          message: `[${ErrorResponseName.MissingFields}]: All fields are required.`,
        },
        body: { missingFields },
      }
    : null;
};

const validateIfNoFieldsProvided = ({
  plate_name,
  owner,
}: CarplateParameters): ErrorResponse | null => {
  return !plate_name && !owner
    ? {
        error: {
          name: ErrorResponseName.MissingFields,
          message: `[${ErrorResponseName.MissingFields}]: No fields provided`,
        },
        body: { plate_name, owner },
      }
    : null;
};

const validateOwner = (owner: string): ErrorResponse | null => {
  return owner.length > OWNER_NAME_MAX_LENGTH ||
    owner.length < OWNER_NAME_MIN_LENGTH
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Owner has to be from ${OWNER_NAME_MIN_LENGTH} - ${OWNER_NAME_MAX_LENGTH} symbols.`,
        },
        body: { owner },
      }
    : null;
};

const validatePlateLength = (plate_name: string): ErrorResponse | null => {
  return plate_name.length !== PLATE_SYMBOLS_TOTAL
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Plate number has to be ${PLATE_SYMBOLS_TOTAL} symbols.`,
        },
        body: { plate_name },
      }
    : null;
};

const validatePlateFormat = (plate_name: string): ErrorResponse | null => {
  return !isCorrectPlateFormat(plate_name)
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Plate number has to be 3 letters and 3 digits format ex: AAA111.`,
        },
        body: { plate_name },
      }
    : null;
};

const isCorrectPlateFormat = (plate_name: string): boolean =>
  /^[a-zA-Z]{3}\d{3}$/.test(plate_name);

// TODO: move pagination functions to dedicated dir
const getPagination = (page: number, size: number): PaginationRange => {
  const limit = size ? +size : DEFAULT_ITEMS_PER_PAGE;
  const offset = page ? page * limit : DEFAULT_PAGE;

  return { limit, offset };
};

const getPagingData = (
  data: PaginatedData<Carplate>,
  page: number,
  limit: number
): PaginatedList<Carplate> => {
  const { count, rows } = data;
  const currentPage = page ? +page : DEFAULT_PAGE;
  const totalPages = Math.ceil(count / limit);

  return { count, totalPages, currentPage, rows };
};

export async function create(req, res, next) {
  try {
    const isValidationFailed = validateCarplateCreate(req.body);
    if (isValidationFailed) {
      res.status(StatusCode.HTTP_400_BAD_REQUEST).json(isValidationFailed);
      return;
    }

    const foundCarplate: Carplate = await Carplate.findOne({
      where: { plate_name: req.body.plate_name.toUpperCase() },
    });

    if (foundCarplate) {
      return next({
        name: 'Already Exists',
        message: `Carplate with plate name ${req.body.plate_name} already exists `,
      });
    }

    const payload: CarplateParameters = {
      plate_name: req.body.plate_name.toUpperCase(),
      owner: req.body.owner,
    };

    const newCarplate: Carplate = await Carplate.create(payload);

    res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(newCarplate);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const isValidationFailed = validateCarplateUpdate(req.body);
    if (isValidationFailed) {
      res.status(StatusCode.HTTP_400_BAD_REQUEST).json(isValidationFailed);
      return;
    }

    const id = req.params.id;

    const foundCarplate: Carplate = await Carplate.findOne({
      where: { plate_name: req.body.plate_name.toUpperCase() },
    });

    if (foundCarplate && foundCarplate.plate_name === req.body.plate_name) {
      return next({
        name: 'Already Exists',
        message: `Carplate with plate name ${req.body.plate_name} already exists `,
      });
    }

    const updatedCarplate: Carplate = await Carplate.update(
      req.body as CarplateParameters,
      {
        where: { id: id },
      }
    );

    res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(updatedCarplate);
  } catch (err) {
    next(err);
  }
}

export async function findAll(req, res, next) {
  try {
    const page: number = req.query.page;
    const size: number = req.query.size;
    const plate_name: string = req.query.plate_name;
    const owner: string = req.query.owner;

    const plate_nameLookup = plate_name
      ? { [Op.like]: `%${plate_name}%` }
      : null;

    const ownerLookup = owner ? { [Op.like]: `%${owner}%` } : null;

    let condition = {};
    if (plate_nameLookup) {
      condition = { ...condition, plate_name: plate_nameLookup };
    }
    if (ownerLookup) {
      condition = { ...condition, owner: ownerLookup };
    }

    const { limit, offset } = getPagination(page, size);

    const data: PaginatedData<Carplate> = await Carplate.findAndCountAll({
      where: condition,
      limit,
      offset,
    });
    const response = getPagingData(data, page, limit);
    res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(response);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req, res, next) {
  try {
    const id: string = req.params.id;

    const singleCarplate: Carplate = await Carplate.findByPk(id);
    res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(singleCarplate);
  } catch (err) {
    next(err);
  }
}

export async function decomm(req, res, next) {
  try {
    const id: string = req.params.id;

    const deletedCarplate: Carplate = await Carplate.destroy({
      where: { id: id },
    });

    res.send(deletedCarplate);
  } catch (err) {
    next(err);
  }
}
