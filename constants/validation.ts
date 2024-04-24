export const MAX_LENGTH = 255;
export const NOT_SPECIAL_CHARACTER = /[^~`!@#$%^&*)(_+={}[\]|/\\:;'"<>,.?]/g;
export const SPECIAL_CHARACTER = /[~`!@#$%^&*)(_+={}[\]|/\\:;'"<>,.?]/g;
export const SPECIAL_CHARACTER_WITHOUT_EMAIL = /[~`!#$%^&*)(\-_+={}[\]|/\\:;'"<>,?]/g;
export const NUMBER_FULL_WIDTH = /(\d|[１２３４５６７８９０])+/g;
export const FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOW_FILE_TYPE_CSV = ['csv'];
export const CONTAIN_LOWERCASE_CHARACTER = /^(?=.*[a-z])/;
export const CONTAIN_UPPERCASE_CHARACTER = /^(?=.*[A-Z])/;
export const CONTAIN_NUMBER = /^(?=.*[0-9])/;
export const CONTAIN_SPECIAL_CHARACTER = /^(?=.*?[#?!@$%^&*-])/;
export const MAX_LENGTH_COMPANY_NAME = 100;
export const MAX_LENGTH_PIC_NAME = 100;
export const MAX_LENGTH_ADDRESS = 255;
export const MAX_LENGTH_EMAIL = 255;
export const MAX_LENGTH_PHONE = 11;
export const COLOR_CODE_LENGTH = 6;
export const COLOR_CODE_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
