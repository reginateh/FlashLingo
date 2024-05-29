import { View, Text } from 'react-native';
import Button from './components/button';
import { FIREBASE_AUTH } from '@/firebaseConfig';

const HomeScreen = () => {
  console.log(FIREBASE_AUTH.currentUser);
  return (
    <View className='w-full justify-center items-center'>
      <Text className="font-bold text-2xl text-center mb-2">Home page</Text>
      <Button bg="dg" size="md" text="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  )
}

export default HomeScreen;
