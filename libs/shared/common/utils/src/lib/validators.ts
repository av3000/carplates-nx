export const isCorrectPlateFormat = (plate_name: string): boolean =>
  plateFormatPattern.test(plate_name);
export const plateFormatPattern = /^[a-zA-Z]{3}\d{3}$/;

export const isCorrectOwnerFormat = (owner: string): boolean =>
  ownerFormatPattern.test(owner);
export const ownerFormatPattern = /^[a-zA-Z]+$/;
