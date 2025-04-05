import { View, Text, TouchableOpacity } from "react-native";
import { useRooms } from "../../../context/RoomProvider";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CompanyFilters({
    companyFilters,
    setCompanyFilters,
    section,
    sectionTitle,
    sectionElement,
    label
}) {
    const { getCompanyNames } = useRooms();

    return (
        <View
            style={section}
        >
            <Text
                style={sectionTitle}
            >
                Company
            </Text>
            {
                getCompanyNames().map((e, i) => (
                    <View
                        key={i}
                        style={sectionElement}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setCompanyFilters(prevFilters =>
                                    prevFilters.includes(e)
                                        ? prevFilters.filter(element => element !== e)
                                        : [...prevFilters, e]
                                );
                            }}
                        >
                            <FontAwesome
                                name={
                                    companyFilters.includes(e)
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