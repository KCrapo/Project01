import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import loginPic from '../../assets/images/loginPic2.jpg';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [savedPassword, setSavedPassword] = useState('');

  // Use effect to fetch saved credentials on component mount
  useEffect(() => {
    const fetchSavedCredentials = async () => {
      const savedUser = await AsyncStorage.getItem('username');
      const savedPass = await AsyncStorage.getItem('password');
      if (savedUser && savedPass) {
        setSavedUsername(savedUser);
        setSavedPassword(savedPass);
      }
    };

    fetchSavedCredentials();
  }, []);

  const saveCredentials = async () => {
    try {
      await AsyncStorage.setItem('username', username); // Save username in AsyncStorage
      await AsyncStorage.setItem('password', password); // Save password in AsyncStorage
      setSavedUsername(username);
      setSavedPassword(password);
      Alert.alert('Saved', 'Your username and password have been saved.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save credentials');
    }
  };

  const login = () => {
    if (username === savedUsername && password === savedPassword) {
      Alert.alert('Welcome', 'You are now logged in!');
    } else {
      Alert.alert('Error', 'Incorrect username or password.');
    }
  };

  return (
    <ImageBackground source={loginPic} style={styles.container} resizeMode="cover">
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={setUsername}
          value={username}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={saveCredentials} />
          <Button title="Login" onPress={login} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for the form
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
