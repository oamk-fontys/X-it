import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRooms } from '../../../context/RoomProvider';
import { useNotification } from "../../../context/NotificationContext";
import DropdownSelector from "../../DropdownSelector";
import ImageUpload from '../../ImageUpload';

const FIELD_NAMES = {
  ROOM_NAME: 'roomName',
  ADDRESS: 'address',
  CITY: 'city',
  COUNTRY: 'country',
  POSTAL_CODE: 'postalCode',
  PHONE: 'phone',
  DURATION: 'duration',
  CLEAN_UP_TIME: 'cleanUpTime',
  DESCRIPTION: 'description'
};

const FormField = React.memo(({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  isSubmitting = false,
  style
}) => {
  const inputStyles = [
    styles.input,
    error ? styles.inputError : null,
    multiline ? styles.descriptionInput : null,
    style
  ];

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={inputStyles}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#777"
        multiline={multiline}
        keyboardType={keyboardType}
        editable={!isSubmitting}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

export default function UpdateRoomForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomId } = route.params;
  const { getRoomByIdFromBackend, updateRoom } = useRooms();
  const { showNotification } = useNotification();
  
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [formData, setFormData] = useState({
    [FIELD_NAMES.ROOM_NAME]: "",
    [FIELD_NAMES.ADDRESS]: "",
    [FIELD_NAMES.CITY]: "",
    [FIELD_NAMES.COUNTRY]: "",
    [FIELD_NAMES.POSTAL_CODE]: "",
    [FIELD_NAMES.PHONE]: "",
    [FIELD_NAMES.DURATION]: 0,
    [FIELD_NAMES.CLEAN_UP_TIME]: 0,
    [FIELD_NAMES.DESCRIPTION]: "",
  });
  const [level, setLevel] = useState("EASY");
  const [initialImage, setInitialImage] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const roomData = await getRoomByIdFromBackend(roomId);
        setRoom(roomData);
        
        setFormData({
          [FIELD_NAMES.ROOM_NAME]: roomData.name || "",
          [FIELD_NAMES.ADDRESS]: roomData.address || "",
          [FIELD_NAMES.CITY]: roomData.city || "",
          [FIELD_NAMES.COUNTRY]: roomData.country || "",
          [FIELD_NAMES.POSTAL_CODE]: roomData.postalCode || "",
          [FIELD_NAMES.PHONE]: roomData.phoneNumber || "",
          [FIELD_NAMES.DURATION]: roomData.duration || 0,
          [FIELD_NAMES.CLEAN_UP_TIME]: roomData.cleanUpTime || 0,
          [FIELD_NAMES.DESCRIPTION]: roomData.description || "",
        });
        setLevel(roomData.difficulty || "EASY");
        setInitialImage(roomData.logo ? roomData.logo.url : null);
        setImage(roomData.logo ? roomData.logo.logoId : null);
      } catch (err) {
        setError(true);
        showNotification("Error fetching room data", "error");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const validateField = useCallback((fieldName, value) => {
    switch (fieldName) {
      case FIELD_NAMES.PHONE:
        return /^[+]?[\d\s-]{8,15}$/.test(value) 
          ? '' 
          : 'Please enter a valid phone number';
      case FIELD_NAMES.POSTAL_CODE:
        return /^[\d-]{4,10}$/.test(value)
          ? ''
          : 'Please enter a valid postal code';
      case FIELD_NAMES.DURATION:
      case FIELD_NAMES.CLEAN_UP_TIME:
        return /^\d+$/.test(value) && parseInt(value) > 0
          ? ''
          : 'Please enter a valid number (minimum 1)';
      default:
        return value.trim() ? '' : 'This field is required';
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.values(FIELD_NAMES).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  const handleFieldChange = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updateRoom(
        roomId,
        formData.roomName,
        formData.description,
        room.company.id,
        formData.duration,
        formData.cleanUpTime,
        level,
        formData.address,
        formData.city,
        formData.postalCode,
        formData.country,
        formData.phone,
        image ? image : null
      );
      showNotification("Room updated successfully", "success");
      navigation.goBack();
    } catch (error) {
      console.error("Room update error:", error);
      showNotification(error.message || "Failed to update room", "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, level, image, roomId, validateForm, navigation]);

  const handleCancel = useCallback(() => {
    const hasChanges = Object.entries(formData).some(([key, value]) => {
      const originalValue = room ? room[key.toLowerCase()] || "" : "";
      return value !== originalValue;
    }) || level !== (room?.difficulty || "EASY") || image !== (room?.image || null);

    if (hasChanges) {
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave?",
        [
          { text: "Stay", style: "cancel" },
          { text: "Leave", onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  }, [formData, level, image, room, navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading room data...</Text>
      </View>
    );
  }

  if (error || !room) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load room data</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Update Room</Text>
          <View style={styles.headerDivider} />
        </View>

        <View style={styles.formContainer}>
          <FormField
            label="Room Name"
            value={formData.roomName}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.ROOM_NAME, text)}
            error={errors.roomName}
            placeholder="Enter room name"
            isSubmitting={isSubmitting}
          />

          <FormField
            label="Street Address"
            value={formData.address}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.ADDRESS, text)}
            error={errors.address}
            placeholder="Enter street address"
            isSubmitting={isSubmitting}
          />

          <FormField
            label="City"
            value={formData.city}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.CITY, text)}
            error={errors.city}
            placeholder="Enter city"
            isSubmitting={isSubmitting}
          />

          <FormField
            label="Country"
            value={formData.country}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.COUNTRY, text)}
            error={errors.country}
            placeholder="Enter country"
            isSubmitting={isSubmitting}
          />

          <FormField
            label="Postal Code"
            value={formData.postalCode}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.POSTAL_CODE, text)}
            error={errors.postalCode}
            placeholder="Enter postal code"
            keyboardType="number-pad"
            isSubmitting={isSubmitting}
          />

          <FormField
            label="Phone"
            value={formData.phone}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.PHONE, text)}
            error={errors.phone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            isSubmitting={isSubmitting}
          />

          <FormField
            label="Duration (minutes)"
            value={formData.duration.toString()}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.DURATION, text)}
            error={errors.duration}
            placeholder="Enter duration in minutes"
            keyboardType="number-pad"
            isSubmitting={isSubmitting}
          />

          <FormField
            label="Clean Up Time (minutes)"
            value={formData.cleanUpTime.toString()}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.CLEAN_UP_TIME, text)}
            error={errors.cleanUpTime}
            placeholder="Enter clean up time in minutes"
            keyboardType="number-pad"
            isSubmitting={isSubmitting}
          />

          <DropdownSelector
            label="Choose Level"
            selectedValue={level}
            onValueChange={setLevel}
            containerStyle={styles.dropdownContainer}
            textColor="#EEEEEE"
            backgroundColor="#393E46"
            accentColor="#00ADB5"
          />

          <FormField
            label="Description"
            value={formData.description}
            onChangeText={(text) => handleFieldChange(FIELD_NAMES.DESCRIPTION, text)}
            error={errors.description}
            placeholder="Enter room description"
            multiline
            isSubmitting={isSubmitting}
          />

          <ImageUpload 
            onUploadSuccess={(response) => {
              setImage(response.id);
            }}
            initialImage={initialImage}
            style={styles.imageUploadContainer}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton, 
              styles.cancelActionButton,
              isSubmitting && styles.disabledButton
            ]}
            onPress={handleCancel}
            disabled={isSubmitting}
          >
            <Text style={styles.actionButtonText}>Discard Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton, 
              styles.saveButton,
              isSubmitting && styles.disabledButton
            ]}
            onPress={handleSave}
            disabled={isSubmitting}
          >
            <Text style={styles.actionButtonText}>
              {isSubmitting ? "Updating..." : "Update Room"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#222831",
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#222831",
  },
  loadingText: {
    color: '#EEEEEE',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#222831",
  },
  errorText: {
    color: '#FF5555',
    fontSize: 18,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'rgba(0, 173, 181, 0.3)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ADB5',
  },
  retryButtonText: {
    color: '#EEEEEE',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EEEEEE',
    marginBottom: 8,
  },
  headerDivider: {
    height: 2,
    backgroundColor: '#00ADB5',
    width: '30%',
    borderRadius: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EEEEEE',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#393E46',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#EEEEEE',
  },
  inputError: {
    borderColor: '#FF5555',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#FF5555',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  imageUploadContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: "rgba(0, 173, 181, 0.2)",
    borderWidth: 1,
    borderColor: '#00ADB5',
    marginLeft: 10,
  },
  cancelActionButton: {
    backgroundColor: "rgba(238, 238, 238, 0.1)",
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 10,
  },
  actionButtonText: {
    color: "#EEEEEE",
    fontWeight: '600',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
