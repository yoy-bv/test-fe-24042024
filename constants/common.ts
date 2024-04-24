const CookieKey = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  currentRoles: 'currentRoles',
  previousUrl: 'previousUrl',
  networkError: 'networkError',
};

const ROUTER = {
  Home: '/',
  PageNotAllowed: '/403',
  PageNotFound: '/404',
  Login: '/login',
};

const ERROR_CODE_IGNORE_REFRESH: string[] = [];

const UNICODE_NORMALIZATION = 'NFKC';
const DATE_FORMAT_VALIDATE = 'Y/m/d';
const TIME_FORMAT_VALIDATE = 'H:i';
const MONTH_PICKER_FORMAT = 'Y/m';

const SELECT_BOX_BORDER_COLOR = '#B2B2B2';
const SELECT_BOX_BORDER_COLOR_FOCUSED = '#4285f4';
const INPUT_PLACEHOLDER_COLOR = '#B2B2B2';
const SELECT_BOX_MENU_PORTAL_Z_INDEX = 5;

const TEXTAREA_ROWS_NUM_DEFAULT = 3;

const LIST_PER_PAGE = [10, 20, 50, 100];

export {
  CookieKey,
  ROUTER,
  ERROR_CODE_IGNORE_REFRESH,
  UNICODE_NORMALIZATION,
  DATE_FORMAT_VALIDATE,
  TIME_FORMAT_VALIDATE,
  MONTH_PICKER_FORMAT,
  SELECT_BOX_BORDER_COLOR,
  SELECT_BOX_BORDER_COLOR_FOCUSED,
  INPUT_PLACEHOLDER_COLOR,
  TEXTAREA_ROWS_NUM_DEFAULT,
  SELECT_BOX_MENU_PORTAL_Z_INDEX,
  LIST_PER_PAGE,
};
