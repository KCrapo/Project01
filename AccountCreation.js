import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AccountCreation({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usersTeam1, setTeam1] = useState('');
  const [usersTeam2, setTeam2] = useState('');

  // Handle account creation with API logic
  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    if (!username || !email || !password || !usersTeam1 || !usersTeam2) {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          team1: usersTeam1,
          team2: usersTeam2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTeam1('');
        setTeam2('');

        // Navigate to Login Page
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error || 'Failed to create account.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Network Error', 'Could not connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Team 1"
        value={usersTeam1}
        onChangeText={setTeam1}
      />

      <TextInput
        style={styles.input}
        placeholder="Team 2"
        value={usersTeam2}
        onChangeText={setTeam2}
      />

      <Button title="Create Account" onPress={handleCreateAccount} />

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingLeft: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
