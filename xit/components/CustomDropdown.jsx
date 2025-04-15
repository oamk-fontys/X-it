import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import globalStyles from '../theme/globalStyles';

export default function CustomDropdown({
  placeholder,
  data,
  value,
  onChange,
  labelField = 'label',
  valueField = 'value',
  style = {},
  textStyle = {},
  placeholderStyle = {},
  ...rest
}) {
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={onChange}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      style={[globalStyles.dropdownBase, style]}
      containerStyle={globalStyles.dropdownContainer}
      selectedTextStyle={[globalStyles.dropdownSelectedText, textStyle]}
      placeholderStyle={[globalStyles.dropdownPlaceholder, placeholderStyle]}
      itemTextStyle={globalStyles.dropdownItemText}
      itemContainerStyle={globalStyles.dropdownItemContainer}
      activeColor={globalStyles.dropdownActiveColor.backgroundColor}
      maxHeight={170}
      {...rest}
    />
  );
}
