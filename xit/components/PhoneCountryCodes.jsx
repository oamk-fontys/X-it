import React, { useRef } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { View } from 'react-native';
import globalStyles from '../theme/globalStyles';

export default function PhoneCountryCode({ value, onChange }) {
    const phoneInputRef = useRef(null);

    return (
        <View style={[globalStyles.horizontalAlignContainer, globalStyles.textMuted, { width: '80%' }]}>
            <PhoneInput
                ref={phoneInputRef}
                defaultValue={value}
                defaultCode="FI"
                layout="first"
                onChangeFormattedText={(formattedValue) => {
                    onChange(formattedValue);
                }}
                containerStyle={globalStyles.dropdownBase}
                textContainerStyle={{ paddingVertical: 0, backgroundColor: 'transparent' }}
                textInputStyle={globalStyles.textSmall}
                codeTextStyle={globalStyles.textSmall}
                flagButtonStyle={{ marginLeft: 8 }}
                textInputProps={{ placeholderTextColor: globalStyles.textMuted.color }}
            />
        </View>
    );
}