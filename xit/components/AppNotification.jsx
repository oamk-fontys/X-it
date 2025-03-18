import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

export default function AppNotification({ message, type }){
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 4500);

    return () => clearTimeout(timeout);
  }, [fadeAnim]);

  const notificationStyle = [
    styles.notification,
    type === 'error' ? styles.error : styles.success,
    { opacity: fadeAnim },
  ];

  return (
    <Animated.View style={notificationStyle}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    backgroundColor: '#ff4444',
  },
  success: {
    backgroundColor: '#00C851',
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});
