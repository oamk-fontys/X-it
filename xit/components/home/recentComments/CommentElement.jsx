import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import globalStyles from "../../../theme/globalStyles";
import { useNavigation } from "@react-navigation/native";

export default function CommentElement({
    text,
    roomName,
    city,
    username,
    date,
    pfp,
    roomId
}) {
    const navigation = useNavigation()

    const formatDate = (date) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const month = months[new Date(date).getMonth()];
        const day = new Date(date).getDate();

        return `${day} ${month}`
    }

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('Room Details', {id: roomId})
            }}
            style={[globalStyles.cardContainer, globalStyles.safeArea]}
        >
            <View
                style={globalStyles.cardHeader}
            >
                <Text
                    style={globalStyles.subTitle}
                >
                    {roomName}
                </Text>
                <Text
                    style={globalStyles.subTitleSmall}
                >
                    {city}
                </Text>
            </View>
            <View
                style={globalStyles.cardBody}
            >
                <View
                    style={globalStyles.cardSubHeader}
                >
                    <Text
                        style={globalStyles.subTitleSmall}
                    >
                        {username}
                    </Text>
                    <Text
                        style={globalStyles.subTitleSmall}
                    >
                        {formatDate(date)}
                    </Text>
                </View>
                <View
                    style={globalStyles.cardItem}
                >
                    <View
                        style={globalStyles.cardItemImage}
                    >
                        <Image
                            style={globalStyles.imageRound}
                            source={{ uri: pfp || 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png' }}
                        />
                    </View>
                    <View
                        style={globalStyles.cardItemContent}
                    >
                        <Text
                            style={globalStyles.textSmall}
                        >
                            {text}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
