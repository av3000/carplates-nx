import { Op } from 'sequelize';

import { PaginatedData, PaginatedList } from '@shared/common/types';
import {
  Carplate,
  CarplateParameters,
  CarplateUpdateParameters,
} from '@shared/carplate/types';
import { StatusCode } from '@shared/common/enums';
import { Pagination } from '@shared/common/utils';
import { db } from '@backend-express/utils';
import * as Helpers from './helpers';

const CarplateSchema = db.CarplateSchema;

export async function create(req, res, next) {
  try {
    const isValidationFailed = Helpers.validateCarplateCreate(req.body);
    if (isValidationFailed) {
      res.status(StatusCode.HTTP_400_BAD_REQUEST).json(isValidationFailed);
      return;
    }

    const foundCarplate: Carplate = await CarplateSchema.findOne({
      where: { plate_name: req.body.plate_name.toUpperCase() },
    });

    if (foundCarplate) {
      return next({
        status: StatusCode.HTTP_400_BAD_REQUEST,
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
    const isValidationFailed = Helpers.validateCarplateUpdate(req.body);
    if (isValidationFailed) {
      res.status(StatusCode.HTTP_400_BAD_REQUEST).json(isValidationFailed);
      return;
    }

    const { id } = req.params;

    const idFormatError = Helpers.validateIdFormat(id);
    if (idFormatError) {
      return res.status(StatusCode.HTTP_400_BAD_REQUEST).json(idFormatError);
    }

    const foundCarplate: Carplate = await CarplateSchema.findOne({
      where: { id: id },
    });

    const updatePayload: CarplateUpdateParameters = {};

    if (req.body.owner) {
      updatePayload.owner = req.body.owner;
    }

    if (req.body.plate_name) {
      updatePayload.plate_name = req.body.plate_name.toUpperCase();
    }

    if (
      foundCarplate &&
      updatePayload.plate_name &&
      foundCarplate.plate_name === updatePayload.plate_name
    ) {
      return next({
        status: StatusCode.HTTP_400_BAD_REQUEST,
        name: 'Already Exists',
        message: `Carplate with plate name ${req.body.plate_name} already exists `,
      });
    }

    await CarplateSchema.update(updatePayload, {
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
    // TODO: validate if filters are valid to query
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

    const { limit, offset } = Pagination.getPagination(page, size);

    const data: PaginatedData<Carplate> = await CarplateSchema.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: [['updatedAt', 'DESC']],
    });

    const response: PaginatedList<Carplate> = Pagination.getPagingData(
      data,
      page,
      limit
    );

    res.status(StatusCode.HTTP_200_SUCCESS_REQUEST).json(response);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req, res, next) {
  try {
    const { id } = req.params;

    const idFormatError = Helpers.validateIdFormat(id);
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
    const idFormatError = Helpers.validateIdFormat(id);
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
