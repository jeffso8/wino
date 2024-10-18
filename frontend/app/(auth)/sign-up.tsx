import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FIRBASE_APP from '../../firebase/config';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '829878053442-ova9ee97ss1tp0mhd2i8u72ga9usi11d.apps.googleusercontent.com',
});

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  
  const handleGoogleSignIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Google Sign-In Success');
      router.replace('/home');
    } catch (error:any) {
      Alert.alert('Google Sign-In Error', error.message);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Sign-Up Success');
    } catch (error:any) {
      Alert.alert('Sign-Up Error', error.message);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Sign-In Success');
      router.replace('/home')
    } catch (error:any) {
      Alert.alert('Sign-In Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="Username" />
      <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry />
      <Button title="Sign In" onPress={handleEmailSignIn} />
      <Button title="Sign Up" onPress={handleEmailSignUp} />
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SignUp;