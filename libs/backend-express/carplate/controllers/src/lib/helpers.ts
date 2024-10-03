import {
  CarplateParameters,
  CarplateUpdateParameters,
} from '@shared/carplate/types';
import { ErrorResponseName } from '@shared/common/enums';
import { ErrorResponse } from '@shared/common/types';
import { Validators } from '@shared/common/utils';

const OWNER_NAME_MAX_LENGTH = 30;
const OWNER_NAME_MIN_LENGTH = 3;

export const errorResponses = {
  missingFields: {
    name: ErrorResponseName.MissingFields,
    message: `[${ErrorResponseName.MissingFields}]: All fields are required.`,
  },
  ownerLength: {
    name: ErrorResponseName.Validation,
    message: `[${ErrorResponseName.Validation}]: Owner length has to be from ${OWNER_NAME_MIN_LENGTH} - ${OWNER_NAME_MAX_LENGTH} and letters only.`,
  },
  plateFormat: {
    name: ErrorResponseName.Validation,
    message: `[${ErrorResponseName.Validation}]: Plate number has to be 3 letters and 3 digits format ex: AAA111.`,
  },
  carplateIdFormat: {
    name: ErrorResponseName.Validation,
    message: `[${ErrorResponseName.Validation}]: Invalid carplate id format.`,
  },
  carplateIdNotFound: {
    name: ErrorResponseName.Validation,
    message: `[${ErrorResponseName.Validation}]: Carplate id not found.`,
  },
};

const validateCarplateGeneralFields = ({
  plate_name,
  owner,
}: CarplateParameters): ErrorResponse | null => {
  const plateFormatError = validatePlateFormat(plate_name);
  const ownerError = owner ? validateOwner(owner) : null;

  if (plateFormatError) {
    return plateFormatError;
  }

  if (ownerError) {
    return ownerError;
  }

  return null;
};

export const validateCarplateCreate = (
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

export const validateCarplateUpdate = ({
  plate_name,
  owner,
}: CarplateUpdateParameters): ErrorResponse | null => {
  const plateError = plate_name ? validatePlate(plate_name) : null;
  const ownerError = owner ? validateOwner(owner) : null;

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

  return plateFormatError ?? null;
};

const validateIfAnyFieldsMissing = (
  carplateCreateParameters: CarplateParameters
): ErrorResponse | null => {
  const missingFields: string[] = [];

  if (!carplateCreateParameters.plate_name) {
    missingFields.push('plate_name');
  }

  if (!carplateCreateParameters.owner) {
    missingFields.push('owner');
  }

  return missingFields.length > 0
    ? {
        error: errorResponses.missingFields,
        body: { missingFields },
      }
    : null;
};

const validateOwner = (owner: string): ErrorResponse | null => {
  return owner.length > OWNER_NAME_MAX_LENGTH ||
    owner.length < OWNER_NAME_MIN_LENGTH ||
    !Validators.isCorrectOwnerFormat(owner)
    ? {
        error: errorResponses.ownerLength,
        body: { owner },
      }
    : null;
};

const validatePlateFormat = (plate_name: string): ErrorResponse | null => {
  return !Validators.isCorrectPlateFormat(plate_name)
    ? {
        error: errorResponses.plateFormat,
        body: { plate_name },
      }
    : null;
};

export const validateIdFormat = (id: string): ErrorResponse | null => {
  return !isCorrectIdFormat(id)
    ? {
        error: errorResponses.carplateIdFormat,
        body: { id },
      }
    : null;
};

const isCorrectIdFormat = (id: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
