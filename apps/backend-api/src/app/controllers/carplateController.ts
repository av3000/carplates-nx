import { CarplateParameters, ResponseName, StatusCode } from '../types';

const _db = require('../models');
const Carplate = _db.carplates;
const Op = _db.Sequelize.Op;

const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;
const DEFAULT_PAGE = 0;
const DEFAULT_ITEMS_PER_PAGE = 3;

const validateCarplateGeneralFields = (plate_name, owner) => {
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
};

const validateCarplateCreate = ({ plate_name, owner }: CarplateParameters) => {
  const generalFieldsError = validateCarplateGeneralFields(plate_name, owner);
  const fieldsMissingError = validateIfAnyFieldsMissing(plate_name, owner);

  if (fieldsMissingError) {
    return fieldsMissingError;
  }

  if (generalFieldsError) {
    return generalFieldsError;
  }

  return null;
};

const validateCarplateUpdate = ({ plate_name, owner }: CarplateParameters) => {
  const generalFieldsError = validateCarplateGeneralFields(plate_name, owner);
  const noFieldsError = validateIfNoFieldsProvided(plate_name, owner);

  if (noFieldsError) {
    return noFieldsError;
  }

  if (generalFieldsError) {
    return generalFieldsError;
  }

  return null;
};

const validateIfAnyFieldsMissing = (plate_name, owner) => {
  return !plate_name || !owner
    ? {
        message: `[${ResponseName.MissingFields}]: All fields are required.`,
        body: { plate_name, owner },
      }
    : null;
};

const validateIfNoFieldsProvided = (plate_name, owner) => {
  return !plate_name && !owner
    ? {
        message: `[${ResponseName.MissingFields}]: No fields provided`,
        body: { plate_name, owner },
      }
    : null;
};

const validateOwner = (owner) => {
  return owner.length > OWNER_NAME_MAX_LENGTH ||
    owner.length < OWNER_NAME_MIN_LENGTH
    ? {
        message: `[${ResponseName.Validation}]: Owner has to be from ${OWNER_NAME_MIN_LENGTH} - ${OWNER_NAME_MAX_LENGTH} symbols.`,
        body: { owner },
      }
    : null;
};

const validatePlateLength = (plate_name) => {
  return plate_name.length !== PLATE_SYMBOLS_TOTAL
    ? {
        message: `[${ResponseName.Validation}]: Plate number has to be ${PLATE_SYMBOLS_TOTAL} symbols.`,
        body: { plate_name },
      }
    : null;
};

const validatePlateFormat = (plate_name) => {
  return !isCorrectPlateFormat(plate_name)
    ? {
        message: `[${ResponseName.Validation}]: Plate number has to be 3 letters and 3 digits format ex: AAA111.`,
        body: { plate_name },
      }
    : null;
};

const isCorrectPlateFormat = (plate_name) =>
  /^[a-zA-Z]{3}\d{3}$/.test(plate_name);

const getPagination = (page, size) => {
  const limit = size ? +size : DEFAULT_ITEMS_PER_PAGE;
  const offset = page ? page * limit : DEFAULT_PAGE;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: carplates } = data;
  const currentPage = page ? +page : DEFAULT_PAGE;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, carplates };
};

module.exports = {
  async create(req, res, next) {
    try {
      const isValidationFailed = validateCarplateCreate(req.body);
      if (isValidationFailed) {
        res.status(StatusCode.HTTP_400_BAD_REQUEST).json(isValidationFailed);
        return;
      }

      const payload = {
        plate_name: req.body.plate_name,
        owner: req.body.owner,
      };

      const newCarplate = await Carplate.create(payload);

      res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(newCarplate);
    } catch (err) {
      res
        .status(StatusCode.HTTP_400_BAD_REQUEST)
        .json({ error: err.errors || err });
    }
  },

  async update(req, res, next) {
    try {
      const isValidationFailed = validateCarplateUpdate(req.body);
      if (isValidationFailed) {
        res.status(StatusCode.HTTP_400_BAD_REQUEST).json(isValidationFailed);
        return;
      }

      const id = req.params.id;
      const updatedCarplate = await Carplate.update(req.body, {
        where: { id: id },
      });

      res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(updatedCarplate);
    } catch (err) {
      res
        .status(StatusCode.HTTP_400_BAD_REQUEST)
        .json({ error: err.errors || err });
    }
  },

  async findAll(req, res, next) {
    try {
      const { page, size, plate_name, owner } = req.query;
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

      const data = await Carplate.findAndCountAll({
        where: condition,
        limit,
        offset,
      });
      const response = getPagingData(data, page, limit);
      res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(response);
    } catch (err) {
      res.status(StatusCode.HTTP_400_BAD_REQUEST).json({ err });
    }
  },

  async findOne(req, res, next) {
    try {
      const id = req.params.id;

      const singleCarplate = await Carplate.findByPk(id);
      res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(singleCarplate);
    } catch (err) {
      res
        .status(StatusCode.HTTP_400_BAD_REQUEST)
        .json({ error: err.errors || err });
    }
  },

  async decomm(req, res, next) {
    try {
      const id = req.params.id;

      const deletedCarplate = await Carplate.destroy({
        where: { id: id },
      });

      res.send(deletedCarplate);
    } catch (err) {
      res
        .status(StatusCode.HTTP_400_BAD_REQUEST)
        .json({ error: err.errors || err });
    }
  },
};
