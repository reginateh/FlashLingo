import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ChangeEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const sendVerificationCode = async () => {
    try {
      await axios.post('http://localhost:3000/send-code', { email });
      Alert.alert('Verification code sent!');
    } catch (error) {
      Alert.alert('Error sending verification code.');
    }
  };

  const changeEmail = async () => {
    try {
      await axios.post('http://localhost:3000/change-email', { email, verificationCode });
      Alert.alert('Email changed successfully!');
    } catch (error) {
      Alert.alert('Error changing email.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your new email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.buttonContainer}>
        <Button title="Send code" onPress={sendVerificationCode} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Key in verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <View style={styles.buttonContainer}>
        <Button title="Done" onPress={changeEmail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5D7C2',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginBottom: 12,
  },
});

export default ChangeEmailScreen;
