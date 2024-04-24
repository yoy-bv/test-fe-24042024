import { useId } from 'react';
import ReactSelect, { Props, components } from 'react-select';
import {
  ControlProps,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  GroupBase,
  StylesConfig,
} from 'react-select/dist/declarations/src';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import cn from 'classnames';

import { ObjectLiteral } from '@/types/common';
import {
  INPUT_PLACEHOLDER_COLOR,
  SELECT_BOX_BORDER_COLOR,
  SELECT_BOX_BORDER_COLOR_FOCUSED,
  SELECT_BOX_MENU_PORTAL_Z_INDEX,
} from '@/base/constants/common';

import styles from './selectBox.module.scss';

const DropdownIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>,
) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <span
          className={cn('iconimgs-chevron-down', styles.selectDropdown, { [styles.isFocused]: props.isFocused })}
          data-testid="dropdown-indicator"
        />
      </components.DropdownIndicator>
    )
  );
};

interface SelectBoxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  noOptionsMessageString?: string;
  ['data-testid']?: string;
}

const SelectBox = <
  TFieldValues extends Record<string, unknown>,
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  control,
  name,
  onChange,
  noOptionsMessageString,
  ...rest
}: Props<Option, IsMulti, Group> & SelectBoxProps<TFieldValues>) => {
  const style: StylesConfig<Option, IsMulti, Group> = {
    control: (base: CSSObjectWithLabel, state: ControlProps<Option, IsMulti, Group>) => ({
      ...base,
      fontSize: '1rem',
      boxShadow: '0',
      borderColor: state.isFocused ? SELECT_BOX_BORDER_COLOR_FOCUSED : SELECT_BOX_BORDER_COLOR,
      '&:hover': {
        borderColor: SELECT_BOX_BORDER_COLOR,
      },
      borderRadius: '10px',
      padding: '0.063rem 0.5rem',
    }),
    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: '1em',
      color: INPUT_PLACEHOLDER_COLOR,
    }),
    menuPortal: (base: CSSObjectWithLabel) => ({
      ...base,
      zIndex: SELECT_BOX_MENU_PORTAL_Z_INDEX,
    }),
  };

  const instanceId = useId();

  return (
    <div className={styles.selectCustom} data-testid={rest['data-testid'] || 'select-box'}>
      <Controller
        control={control}
        name={name as Path<TFieldValues>}
        render={({ field, fieldState: { error } }) => (
          <>
            <ReactSelect
              instanceId={instanceId}
              className={cn('form-control-select', { invalid: error?.message }, styles.selectCustomControl)}
              classNamePrefix="hook-select"
              {...rest}
              {...(field as ObjectLiteral)}
              styles={style}
              onChange={(newValue, actionMeta) => {
                field.onChange(newValue);
                onChange?.(newValue, actionMeta);
              }}
              menuPlacement="auto"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
              noOptionsMessage={() => noOptionsMessageString || ''}
            />
            {error?.message && <p className="error-msg">{error?.message}</p>}
          </>
        )}
      />
    </div>
  );
};
export default SelectBox;
