import { Form } from 'react-bootstrap';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { ObjectLiteral } from '@/types/common';

interface CheckboxProps<TFieldValues extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  type: FormCheckType;
  onValueChange?: (value: string | number | readonly string[] | boolean | undefined) => void;
  ['data-testid']?: string;
}

const InputCheck = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  type,
  onValueChange,
  ...rest
}: CheckboxProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => {
      if (type === 'radio')
        return (
          <>
            <Form.Check
              type="radio"
              checked={rest?.value === field?.value}
              data-testid={rest?.['data-testid'] || 'input-check'}
              {...(field as ObjectLiteral)}
              {...rest}
              onChange={() => {
                field.onChange(rest?.value);
                onValueChange?.(rest?.value);
              }}
            />
          </>
        );
      return (
        <>
          <Form.Check
            type={type}
            checked={rest.checked || !!field?.value}
            data-testid={rest['data-testid'] || 'input-check'}
            {...(field as ObjectLiteral)}
            {...rest}
            onChange={(event) => {
              field.onChange(event?.target?.checked);
              onValueChange?.(event?.target?.checked);
            }}
          />
        </>
      );
    }}
  ></Controller>
);

export default InputCheck;
