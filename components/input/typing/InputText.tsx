import { Control, Controller, Path, FieldValues } from 'react-hook-form';
import { Form, FormControlProps } from 'react-bootstrap';
import cn from 'classnames';

import { InputTextType } from '@/base/types/form';
import { MAX_LENGTH, SPECIAL_CHARACTER, SPECIAL_CHARACTER_WITHOUT_EMAIL } from '@/base/constants/validation';
import { EnumTypeInput } from '@/base/types/common';

interface InputTextProps<TFieldValues extends FieldValues> extends FormControlProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  customClass?: string;
  postfix?: string;
  prefix?: string;
  maxLength?: number;
  dataErrorId?: string;
  invalid?: boolean;
  typeInput?: EnumTypeInput;
  isBlockSpecialCharacter?: boolean;
  ['data-testid']?: string;
}

const InputText = <TFieldValues extends Record<string, unknown>>({
  control,
  name,
  onChange,
  customClass,
  postfix,
  prefix,
  maxLength,
  dataErrorId,
  invalid,
  typeInput = EnumTypeInput.TEXT,
  isBlockSpecialCharacter,
  ...rest
}: InputTextProps<TFieldValues>) => {
  const handleChangeValue = (event: InputTextType, formOnChange: (event: InputTextType) => void) => {
    let data = '';
    if (typeInput === EnumTypeInput.EMAIL) {
      data = event.target.value.replace(SPECIAL_CHARACTER_WITHOUT_EMAIL, '').substring(0, maxLength || MAX_LENGTH);
    } else if (isBlockSpecialCharacter) {
      data = event.target.value.replace(SPECIAL_CHARACTER, '').substring(0, maxLength || MAX_LENGTH);
    } else {
      data = event.target.value.substring(0, maxLength || MAX_LENGTH);
    }
    const eventAfter = { ...event, target: { ...event.target, value: data } };
    onChange?.(eventAfter);
    formOnChange(eventAfter);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Form.Control
            {...field}
            {...rest}
            name={name}
            className={cn('form-field', customClass)}
            value={(field.value ?? rest.value ?? '') as string}
            isInvalid={invalid ?? !!error?.message}
            onChange={(event: InputTextType) => handleChangeValue(event, field.onChange)}
          />
          {postfix && (
            <span data-testid={`${rest?.['data-testid'] || ''}-input-postfix`} className="postfix">
              {postfix}
            </span>
          )}
          {prefix && (
            <span data-testid={`${rest?.['data-testid'] || ''}-input-prefix`} className="prefix">
              {prefix}
            </span>
          )}
          {error?.message && (
            <Form.Control.Feedback type="invalid" className="d-flex" data-testid={dataErrorId}>
              {error?.message}
            </Form.Control.Feedback>
          )}
        </>
      )}
    />
  );
};
export default InputText;
