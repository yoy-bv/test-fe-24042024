import { Control, Controller, Path, FieldValues } from 'react-hook-form';
import { Form, FormControlProps } from 'react-bootstrap';
import cn from 'classnames';

import { InputTextType } from '@/base/types/form';
import { MAX_LENGTH, SPECIAL_CHARACTER } from '@/base/constants/validation';
import { TEXTAREA_ROWS_NUM_DEFAULT } from '@/base/constants/common';

interface TextareaProps<TFieldValues extends FieldValues> extends FormControlProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  customClass?: string;
  postfix?: string;
  prefix?: string;
  maxLength?: number;
  rows?: number;
}

const Textarea = <TFieldValues extends Record<string, unknown>>({
  control,
  name,
  onChange,
  customClass,
  postfix,
  prefix,
  maxLength,
  ...rest
}: TextareaProps<TFieldValues>) => {
  const handleChangeValue = (event: InputTextType, formOnChange: (event: InputTextType) => void) => {
    const data = event.target.value.replace(SPECIAL_CHARACTER, '').substring(0, maxLength || MAX_LENGTH);
    const eventAfter = { ...event, target: { ...event.target, value: data } };
    const eventUpdated = event;
    eventUpdated.target.value = data;
    eventUpdated.target.style.height = 'auto';
    eventUpdated.target.style.height = `${event.target.scrollHeight}px`;
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
            {...rest}
            {...field}
            name={name}
            as="textarea"
            rows={rest.rows || TEXTAREA_ROWS_NUM_DEFAULT}
            className={cn('form-field', 'input-area', customClass)}
            value={(field.value ?? '') as string}
            isInvalid={!!error?.message}
            onChange={(event: InputTextType) => handleChangeValue(event, field.onChange)}
          />
          {postfix && (
            <span data-testid="textarea-postfix" className="postfix">
              {postfix}
            </span>
          )}
          {prefix && (
            <span data-testid="textarea-prefix" className="prefix">
              {prefix}
            </span>
          )}
          {error?.message && (
            <Form.Control.Feedback type="invalid" data-testid="textarea-error">
              {error?.message}
            </Form.Control.Feedback>
          )}
        </>
      )}
    />
  );
};
export default Textarea;
