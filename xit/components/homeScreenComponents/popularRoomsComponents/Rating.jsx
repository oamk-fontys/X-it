import { View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import globalStyles from "../../../theme/globalStyles";

export default function Rating({ rating, size }) {
    let stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
            'star-o'
        );
    }

    for (let i = 0; i < rating - 0.25; i += 0.5) {
        const floor = Math.floor(i);

        if (stars[floor] === 'star-o') {
            stars[floor] = 'star-half-o';
        } else if (stars[floor] === 'star-half-o') {
            stars[floor] = 'star';
        }
    }

    return (
        <View
            style={globalStyles.horizontalAlignContainer}
        >
            {stars.map((e, i) => (
                <FontAwesome
                    style={globalStyles.iconPrimary}
                    key={i}
                    name={e}
                    size={size}
                />
            ))}
        </View>
    )
}