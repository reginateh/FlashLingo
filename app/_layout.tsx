import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#B9CBB1",
        },
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens/loginScreen" options={{ title: "Login" }} />
      <Stack.Screen
        name="screens/signUpScreen"
        options={{ title: "Create Account" }}
      />
    </Stack>
  );
}
