import { View, Text, TouchableOpacity } from "react-native";
import { useRooms } from "../../../context/RoomProvider";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CityFilters({
    cityFilters,
    setCityFilters,
    section,
    sectionTitle,
    sectionElement,
    label
}) {
    const { getCities } = useRooms();

    return (
        <View
            style={section}
        >
            <Text
                style={sectionTitle}
            >
                City
            </Text>
            {
                getCities().map((e, i) => (
                    <View
                        key={i}
                        style={sectionElement}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setCityFilters(prevFilters =>
                                    prevFilters.includes(e)
                                        ? prevFilters.filter(element => element !== e)
                                        : [...prevFilters, e]
                                );
                            }}
                        >
                            <FontAwesome
                                name={
                                    cityFilters.includes(e)
                                    ?
                                    'check-square'
                                    :
                                    'square-o'
                                }
                                size={32}
                                color="#00ADB5"
                            />
                        </TouchableOpacity>
                        <Text
                            style={label}
                        >
                            {e}
                        </Text>
                    </View>
                ))
            }
        </View>
    )
}