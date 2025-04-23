import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from "../context/AuthContext";

const ImageUpload = ({ onUploadSuccess, initialImage }) => {

    const { token } = useAuth();

  const [image, setImage] = useState(initialImage);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera roll permissions are needed to select images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please select an image first');
      return;
    }

    // Skip upload if image is already a URL (from initialImage)
    if (image.startsWith('http')) {
      Alert.alert('Info', 'Image is already uploaded');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const uploadUrl = `${process.env.EXPO_PUBLIC_API_URL}/file/upload`;
      
      const uploadTask = FileSystem.createUploadTask(
        uploadUrl,
        image,
        {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'file',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        },
        (uploadProgress) => {
          setProgress(uploadProgress.totalBytesSent / uploadProgress.totalBytesExpectedToSend);
        }
      );

      const response = await uploadTask.uploadAsync();
      const result = JSON.parse(response.body);
      
      if (response.status >= 200 && response.status < 300) {
        setImage(result.url);
        if (onUploadSuccess) {
          onUploadSuccess(result);
        }
      } else {
        throw new Error(result.message || 'Upload failed with status: ' + response.status);
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', error.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.selectButton]}
          onPress={pickImage}
          disabled={uploading}
        >
          <Ionicons name="image-outline" size={20} color="#EEEEEE" />
          <Text style={styles.buttonText}>
            {image ? 'Change Image' : 'Select Image'}
          </Text>
        </TouchableOpacity>

        {image && !image.startsWith('http') && (
          <TouchableOpacity 
            style={[styles.button, styles.uploadButton]}
            onPress={uploadImage}
            disabled={uploading}
          >
            <Ionicons name="cloud-upload-outline" size={20} color="#EEEEEE" />
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        )}
      </View>

      {image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={styles.image} 
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={removeImage}
            disabled={uploading}
          >
            <Ionicons name="close-circle" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      )}

      {uploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="large" color="#00ADB5" />
          <Text style={styles.progressText}>
            Uploading... {Math.round(progress * 100)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
  },
  selectButton: {
    backgroundColor: 'rgba(0, 173, 181, 0.2)',
    borderWidth: 1,
    borderColor: '#00ADB5',
    marginRight: 10,
  },
  uploadButton: {
    backgroundColor: 'rgba(57, 62, 70, 0.8)',
    borderWidth: 1,
    borderColor: '#393E46',
  },
  buttonText: {
    color: '#EEEEEE',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ADB5',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(34, 40, 49, 0.7)',
    borderRadius: 20,
    padding: 2,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  progressText: {
    color: '#EEEEEE',
    marginTop: 8,
    fontSize: 14,
  },
});

export default ImageUpload;