import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function CompanyHeader({
  name,
  address,
  city,
  postalCode,
  phone,
  vat,
  description,
  verified
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{name}</Text>
        {verified && (
          <FontAwesome name="check-circle" size={20} color="#4CAF50" style={styles.verifiedIcon} />
        )}
      </View>

      {(address || city || postalCode) && (
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#fff" />
          <Text style={styles.text}>
            {[address, `${postalCode} ${city}`].filter(Boolean).join(', ')}
          </Text>
        </View>
      )}

      {phone && (
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={16} color="#fff" />
          <Text style={styles.text}>{phone}</Text>
        </View>
      )}

      {vat && (
        <View style={styles.infoRow}>
          <MaterialIcons name="receipt" size={16} color="#fff" />
          <Text style={styles.text}>VAT: {vat}</Text>
        </View>
      )}

      {description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(34, 40, 49, 0.9)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  descriptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  descriptionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
});

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// export default function CompanyHeader({ name, address, phone }) {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.name}>{name}</Text>
            
//             {address && (
//                 <View style={styles.infoRow}>
//                     <MaterialIcons name="location-on" size={16} color="#fff" />
//                     <Text style={styles.address}>{address}</Text>
//                 </View>
//             )}
            
//             {phone && (
//                 <View style={styles.infoRow}>
//                     <MaterialIcons name="phone" size={16} color="#fff" />
//                     <Text style={styles.phone}>{phone}</Text>
//                 </View>
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         marginBottom: 16,
//         backgroundColor: 'rgba(34, 40, 49, 0.9)',
//         borderRadius: 12,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     name: {
//         fontSize: 22,
//         fontWeight: '700',
//         color: '#fff',
//         marginBottom: 12,
//     },
//     infoRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     address: {
//         fontSize: 14,
//         color: '#fff',
//         marginLeft: 8,
//     },
//     phone: {
//         fontSize: 14,
//         color: '#fff',
//         marginLeft: 8,
//     }
// });
