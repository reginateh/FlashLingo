import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from 'react';
import Button from '../components/button';
import HomeScreen from '../homeScreen';

type AuthProps = {
  type: "login" | "signup"
}

const Authentication = ({ type }: AuthProps) => {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [])

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("login:");
      console.log(res);
    } catch (error: any) {
      console.log(error);
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("signup:");
      console.log(res);
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='flex-1 w-full'>
      {user ? (
        <HomeScreen />
      ) : (
        <View className='flex-1 justify-center items-center px-4'>
          {type == "login" ? (<Text className='text-2xl mb-4'>Welcom back!</Text>
          ) : (
            <Text className='text-2xl mb-4'>Start your journey now!</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
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
              onPress={type == "login" ? handleLogin : handleSignup} 
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Authentication;
