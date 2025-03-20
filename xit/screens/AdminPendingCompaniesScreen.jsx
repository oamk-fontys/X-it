import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import globalStyles from "../theme/globalStyles";

const AdminPendingCompaniesScreen = () => {

    /* ----------------------- TEMPORARY CODE ----------------------- */
    //This is only here as I need an endpoint for fetching pending companies
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch("http://192.168.1.4:3000/api/company");
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);
    /* ----------------------- TEMPORARY CODE ----------------------- */

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.mainContainer}>
                <View style={globalStyles.titleContainer}>
                    <Text style={globalStyles.title}>All Companies</Text>
                </View>
                <FlatList
                    data={companies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={globalStyles.cardContainer}>
                            <View style={globalStyles.cardHeader}>
                                <Text style={globalStyles.title}>{item.name}</Text>
                            </View>
                            <View style={[globalStyles.cardBody, globalStyles.singleCardBody]}>

                                <Text style={globalStyles.text}>Description:</Text>
                                <Text style={globalStyles.text}>{item.description}</Text>


                                {/* Owner information */}
                                <View style={[globalStyles.cardItem, globalStyles.cardBody]}>
                                    <View style={globalStyles.cardSubHeader}>
                                        <Text style={globalStyles.subTitleSmall}>Owner information</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Full name:</Text>
                                        <Text style={globalStyles.textMuted}>[firstName] [lastName]</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Username:</Text>
                                        <Text style={globalStyles.textMuted}>[userName]</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>E-mail: </Text>
                                        <Text style={globalStyles.textMuted}>[email]@mail.com</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Phone: </Text>
                                        <Text style={globalStyles.textMuted}>[phoneNumber]</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Birthday:</Text>
                                        <Text style={globalStyles.textMuted}>[dateOfBirth]</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>ID:</Text>
                                        <Text style={[globalStyles.textMini, globalStyles.textMuted]}>[long-ass-user-id-number-here]</Text>
                                    </View>
                                </View>

                                {/* Company information */}
                                <View style={[globalStyles.cardItem, globalStyles.cardBody]}>
                                    <View style={globalStyles.cardSubHeader}>
                                        <Text style={globalStyles.subTitleSmall}>Company information</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Name:</Text>
                                        <Text style={globalStyles.textMuted}>{item.name}</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>VAT number:</Text>
                                        <Text style={globalStyles.textMuted}>{item.vat}</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>ID:</Text>
                                        <Text style={[globalStyles.textMini, globalStyles.textMuted]}>{item.id}</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Postal Code: </Text>
                                        <Text style={globalStyles.textMuted}>{item.postalCode}</Text>
                                    </View>
                                </View>

                                {/* Company address box */}
                                <View style={[globalStyles.cardItem, globalStyles.cardBody]}>
                                    <View style={globalStyles.cardSubHeader}>
                                        <Text style={globalStyles.subTitleSmall}>Company address</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Street:</Text>
                                        <Text style={globalStyles.textMuted}>{item.address}</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>City:</Text>
                                        <Text style={globalStyles.textMuted}>{item.city}</Text>
                                    </View>
                                    <View style={globalStyles.horizontalAlignContainer}>
                                        <Text style={globalStyles.textMuted}>Postal Code: </Text>
                                        <Text style={globalStyles.textMuted}>{item.postalCode}</Text>
                                    </View>
                                </View>

                                <View style={globalStyles.titleContainerontainer}>
                                    <Text style={globalStyles.text}>Verified: {item.verified ? "Yes" : "No"}</Text>
                                </View>


                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default AdminPendingCompaniesScreen;
