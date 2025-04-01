import { View, Text } from "react-native"
import globalStyles from "../../../theme/globalStyles";

export default function Message({ text }) {
    return (
        <View
            key={0}
            style={globalStyles.cardContainer}
        >
            <Text
                style={[globalStyles.title, globalStyles.textError]}
            >
                {text}
            </Text>
        </View>
    )
}