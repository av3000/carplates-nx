import { CarplateParameters } from '../models/carplate.model';

const _db = require('../models');
const Carplate = _db.carplates;
const Op = _db.Sequelize.Op;

const PLATE_SYMBOLS_TOTAL = 6;
const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;

enum ResponseName {
  MissingFields = 'Missing Fields',
  Validation = 'Validation Error',
}

enum StatusCode {
  HTTP_200_SUCCESS_REQUEST = 200,
  HTTP_403_FORBIDDEN_REQUEST = 403,
  HTTP_400_BAD_REQUEST = 400,
  HTTP_500_INTERNAL_SERVER_ERROR = 500,
}

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
      const plate_name = req.query.plate_name;
      const condition = plate_name
        ? { plate_name: { [Op.like]: `%${plate_name}%` } }
        : null;

      const carplatesList = await Carplate.findAll({ where: condition });

      res
        .status(StatusCode.HTTP_200_SUCCESS_REQUEST)
        .json({ list: carplatesList });
    } catch (err) {
      res
        .status(StatusCode.HTTP_400_BAD_REQUEST)
        .json({ error: err.errors || err });
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
