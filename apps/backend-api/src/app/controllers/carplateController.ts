// TODO: move constants and helper functions to their dedicated dir/create shared libs
// TODO: move validation functions to dedicated dir/create shared libs
// TODO: move pagination functions to dedicated dir
// TODO: move error handling to dedicated dir(?)
// TODO: fix pagination to show page size starting from 1 (not 0)

import { Op } from 'sequelize';

import {
  ErrorResponse,
  PaginatedData,
  PaginatedList,
  PaginationRange,
} from '../types';
import { Carplate, CarplateParameters } from '../types/carplate';
import { ErrorResponseName, StatusCode } from '../enums';
import db from '../models';
const CarplateSchema = db.CarplateSchema;

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

const validateCarplateUpdate = ({
  plate_name,
  owner,
}: CarplateParameters): ErrorResponse | null => {
  const noFieldsError = validateIfNoFieldsProvided({ plate_name, owner });
  const plateError = plate_name ? validatePlate(plate_name) : null;
  const ownerError = owner ? validateOwner(owner) : null;

  if (noFieldsError) {
    return noFieldsError;
  }

  if (plateError) {
    return plateError;
  }

  if (ownerError) {
    return ownerError;
  }

  return null;
};

const validatePlate = (plate_name: string): ErrorResponse | null => {
  const plateFormatError = validatePlateFormat(plate_name);
  const plateLengthError = validatePlateLength(plate_name);

  if (plateLengthError) {
    return plateLengthError;
  }

  if (plateFormatError) {
    return plateFormatError;
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

const validateIdFormat = (id: string): ErrorResponse | null => {
  return !isCorrectIdFormat(id)
    ? {
        error: {
          name: ErrorResponseName.Validation,
          message: `[${ErrorResponseName.Validation}]: Invalid carplate id format.`,
        },
        body: { id },
      }
    : null;
};

const isCorrectIdFormat = (id: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );

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

    const foundCarplate: Carplate = await CarplateSchema.findOne({
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

    const newCarplate: Carplate = await CarplateSchema.create(payload);

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

    const { id } = req.params;

    const idFormatError = validateIdFormat(id);
    if (idFormatError) {
      return res.status(StatusCode.HTTP_400_BAD_REQUEST).json(idFormatError);
    }

    const payload: CarplateParameters = {
      plate_name: req.body.plate_name
        ? req.body.plate_name.toUpperCase()
        : null,
      owner: req.body.owner ? req.body.owner : null,
    };

    const foundCarplate: Carplate = await CarplateSchema.findOne({
      where: payload,
    });

    if (foundCarplate && foundCarplate.plate_name === req.body.plate_name) {
      return next({
        name: 'Already Exists',
        message: `Carplate with plate name ${req.body.plate_name} already exists `,
      });
    }

    await CarplateSchema.update(req.body as CarplateParameters, {
      where: { id: id },
    });

    res
      .status(StatusCode.HTTP_200_SUCCESS_REQUEST)
      .json({ message: 'Carplate updated successfully', id });
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

    const data: PaginatedData<Carplate> = await CarplateSchema.findAndCountAll({
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
    const { id } = req.params;

    const idFormatError = validateIdFormat(id);
    if (idFormatError) {
      return res.status(StatusCode.HTTP_400_BAD_REQUEST).json(idFormatError);
    }

    const singleCarplate: Carplate | null = await CarplateSchema.findByPk(id);
    res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(singleCarplate ?? {});
  } catch (err) {
    next(err);
  }
}

export async function decomm(req, res, next) {
  try {
    const { id } = req.params;
    const idFormatError = validateIdFormat(id);
    if (idFormatError) {
      return res.status(StatusCode.HTTP_400_BAD_REQUEST).json(idFormatError);
    }

    const existingCarplate: Carplate | null = await CarplateSchema.findByPk(id);
    if (!existingCarplate) {
      return res
        .status(StatusCode.HTTP_404_NOT_FOUND)
        .json({ message: 'Carplate not found' });
    }

    await CarplateSchema.destroy({
      where: { id: id },
    });

    res
      .status(StatusCode.HTTP_200_SUCCESS_REQUEST)
      .json({ message: 'Carplate deleted successfully', id });
  } catch (err) {
    next(err);
  }
}
