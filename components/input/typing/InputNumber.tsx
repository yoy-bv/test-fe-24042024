import { Control, Controller, Path, FieldValues, UseFormSetValue, PathValue } from 'react-hook-form';
import { Form, FormControlProps } from 'react-bootstrap';
import cn from 'classnames';

import { InputTextType } from '@/base/types/form';
import { UNICODE_NORMALIZATION } from '@/base/constants/common';
import { MAX_LENGTH, NUMBER_FULL_WIDTH } from '@/base/constants/validation';

interface InputNumberProps<TFieldValues extends FieldValues> extends FormControlProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  customClass?: string;
  postfix?: string;
  prefix?: string;
  maxLength?: number;
}

const InputNumber = <TFieldValues extends Record<string, unknown>>({
  control,
  name,
  onChange,
  setValue,
  customClass,
  postfix,
  prefix,
  maxLength,
  ...rest
}: InputNumberProps<TFieldValues>) => {
  const handleChangeValue = (event: InputTextType, formOnChange: (event: InputTextType) => void) => {
    const numberMatched = (event.target.value ?? '').match(NUMBER_FULL_WIDTH);
    const value = numberMatched
      ? numberMatched
          .join('')
          .normalize(UNICODE_NORMALIZATION)
          .substring(0, maxLength || MAX_LENGTH)
      : '';
    const eventAfter = { ...event, target: { ...event.target, value } };
    onChange?.(eventAfter);
    setValue(name, value as PathValue<TFieldValues, Path<TFieldValues>>);
    formOnChange(eventAfter);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Form.Control
            {...rest}
            {...field}
            name={name}
            className={cn('form-field', customClass)}
            value={(field.value ?? '') as string}
            isInvalid={!!error?.message}
            onChange={(event: InputTextType) => handleChangeValue(event, field.onChange)}
          />
          {postfix && (
            <span data-testid="number-postfix" className="postfix">
              {postfix}
            </span>
          )}
          {prefix && (
            <span data-testid="number-prefix" className="prefix">
              {prefix}
            </span>
          )}
          {error?.message && <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>}
        </>
      )}
    />
  );
};
export default InputNumber;
