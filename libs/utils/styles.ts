import { COLOR_CODE_REGEX } from '@/base/constants/validation';

function hexToRgbStr(hex: string) {
  const result = COLOR_CODE_REGEX.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '';
}

export { hexToRgbStr };
