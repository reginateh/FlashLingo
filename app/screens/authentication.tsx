import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { useState } from 'react';
import Button from '../components/button';
import { router } from 'expo-router';

type AuthProps = {
  type: "login" | "signup"
}

/**
 * The page for user authentication
 * User will be redirected to home page upon successful login or sign up
 * @param type The type of authentication: "login" or "signup"
 */
const Authentication = ({ type }: AuthProps) => {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUpOrLogin = (dispatch: "login" | "signup") => {
    return async () => {
      try {
        setLoading(true);
        const res = dispatch === "login" ? 
          await signInWithEmailAndPassword(auth, email, password) : 
          await createUserWithEmailAndPassword(auth, email, password);
        console.log(dispatch + ":");
        console.log(res);
        router.navigate("/screens/homeScreen");
      } catch (error: any) {
        console.log(error);
        alert(dispatch + ' failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
  }

  return (
    <View className='flex-1 justify-center items-center px-4'>
      {type == "login" ? (<Text className='text-2xl mb-4'>Welcome back!</Text>
      ) : (
        <Text className='text-2xl mb-4'>Start your journey now!</Text>
      )}
      <TextInput
        className='w-full h-10 border border-gray-300 rounded-md px-2.5 mb-2.5'
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        className='w-full h-10 border border-gray-300 rounded-md px-2.5 mb-2.5'
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button 
          bg="dg" 
          size="md" 
          text={type == "login" ? "Login" : "Create Account"} 
          onPress={type == "login" ? handleSignUpOrLogin("login") : handleSignUpOrLogin("signup")} 
        />
      )}
    </View>
  );
};

export default Authentication;
