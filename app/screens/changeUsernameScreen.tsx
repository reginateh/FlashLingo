import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangeUsernameScreen = () => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Username</Text>
      <TextInput
        style={styles.input}
        placeholder="what do you want your new name to be"
        maxLength={50}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.charLimit}>max. 50 characters</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      <View style={styles.navBar}>
        <Text style={styles.navItem}>Flashcard</Text>
        <Text style={styles.navItemActive}>Achievement</Text>
        <Text style={styles.navItem}>Planning</Text>
        <Text style={styles.navItem}>Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5D7C2',
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: '#B9CBB1',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  charLimit: {
    color: '#7D7D7D',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#D98A74',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#B5C7A3',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    color: '#000',
  },
  navItemActive: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default ChangeUsernameScreen;
