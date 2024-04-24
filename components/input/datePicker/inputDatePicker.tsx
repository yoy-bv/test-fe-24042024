import { useEffect, useRef } from 'react';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { Control, Controller, Path, FieldValues } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { Japanese } from 'flatpickr/dist/l10n/ja';
import cn from 'classnames';

import { DATE_FORMAT_VALIDATE } from '@/base/constants/common';
import { useTranslation } from '@/base/config/i18next';
import styles from './inputDatePicker.module.scss';

interface InputDatePickerProps<TFieldValues extends FieldValues> extends DateTimePickerProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  customClass?: string;
  postfix?: string;
  prefix?: string;
  placeholder?: string;
  disabled?: boolean;
  innerKey?: string;
  disabledDate?: string[];
}
const InputDatePicker = <TFieldValues extends Record<string, unknown>>({
  control,
  name,
  onChange,
  customClass,
  postfix,
  prefix,
  placeholder,
  disabled = false,
  innerKey,
  disabledDate,
  ...rest
}: InputDatePickerProps<TFieldValues>) => {
  const { i18n } = useTranslation('common');
  const inputRef = useRef<Flatpickr | null>(null);

  useEffect(() => {
    if (inputRef.current?.flatpickr?.altInput) inputRef.current.flatpickr.altInput.disabled = disabled;
  }, [disabled]);

  useEffect(() => {
    const listDisabledDate = disabledDate?.map((date) => new Date(date)) || [];
    if (inputRef.current?.flatpickr?.config) inputRef.current.flatpickr.config.disable = listDisabledDate;
  }, [disabledDate]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={styles.dateControl}>
          <Flatpickr
            key={innerKey ?? undefined}
            {...rest}
            {...field}
            name={field.name}
            value={field.value as string | undefined}
            ref={(ref) => {
              inputRef.current = ref;
              field.ref({
                focus: () => null,
              });
            }}
            className={cn('form-field', styles.dateFormControl, customClass, { [styles.invalid]: error?.message })}
            options={{
              altFormat: DATE_FORMAT_VALIDATE,
              altInput: true,
              dateFormat: DATE_FORMAT_VALIDATE,
              disableMobile: true,
              locale: i18n.language === 'en' ? 'default' : Japanese,
              wrap: true,
              ...rest.options,
            }}
            onOpen={(selectedDates, dateStr, instance) => {
              instance.setDate(selectedDates);
            }}
            onChange={(dates: Date[], ...self) => {
              field.onChange(dates);
              onChange?.(dates, ...self);
            }}
          >
            <input
              data-testid="label-input-date-picker"
              type="text"
              data-input
              className={cn(styles.input, { [styles.error]: error?.message }, 'w-100 form-control')}
              placeholder={placeholder || ''}
            />
            <div className={cn(styles.toggle)} title="toggle" data-toggle>
              <span className="iconimgs-calendar" />
            </div>
          </Flatpickr>
          {postfix && <span className="postfix">{postfix}</span>}
          {prefix && <span className="prefix">{prefix}</span>}
          {error?.message && (
            <Form.Control.Feedback className="d-block" type="invalid">
              {error?.message}
            </Form.Control.Feedback>
          )}
        </div>
      )}
    />
  );
};

export default InputDatePicker;
