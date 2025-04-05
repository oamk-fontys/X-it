import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import globalStyles from "../../theme/globalStyles";

export default function RoomElement({ room, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.roomContainer}>
                <Text style={styles.roomName}>{room.name}</Text>
                <Text style={styles.roomDetails}>{room.address}</Text>
                <Text style={styles.roomLevel}>Level: {room.level}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    roomContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        ...globalStyles.shadow
    },
    roomName: {
        ...globalStyles.subtitle,
        color: globalStyles.primaryColor
    },
    roomDetails: {
        ...globalStyles.text,
        marginVertical: 5
    },
    roomLevel: {
        ...globalStyles.textSmall,
        color: globalStyles.secondaryTextColor
    }
};

// import React from "react";
// import {View, Text, Image, TouchableOpacity} from "react-native";
// import {useNavigation} from "@react-navigation/native";
// import globalStyles from "../../theme/globalStyles";

// const placeholderImage = require("../../assets/profile-placeholder.jpeg");

// export default function RoomElement({id, roomName}) {
//     const navigation = useNavigation();

//     return (
//         <View
//             style={globalStyles.container}
//         >
//             <TouchableOpacity
//                 style={globalStyles.cardItem}
//                 onPress={() => navigation.navigate("Room Management", {roomId: id})}
//             >
//                 <View style={globalStyles.cardItemImage}>
//                     <Image source={placeholderImage} style={globalStyles.image}/>
//                 </View>

//                 <View style={globalStyles.cardItemContent}>
//                     <Text style={globalStyles.subTitle}>{roomName}</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     );
// }
