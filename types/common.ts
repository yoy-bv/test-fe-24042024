export enum EnumTypeInput {
  EMAIL = 'email',
  TEXT = 'text',
  PASSWORD = 'password',
}

export type ObjectLiteral = {
  [key: string]: any;
};

export type BasicColorsData = {
  backgroundColorPicked?: string;
  textColorPicked?: string;
};

export type PaginationResponse = {
  total?: number;
  limit?: number;
  offset?: number;
  prev?: number | null;
  current?: number;
  next?: number;
  last?: number | null;
  first?: number;
};

export type ParamsRequest = {
  q?: string | number;
  limit?: string | number;
  page?: string | number;
};
