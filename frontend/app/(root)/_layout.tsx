import { Stack } from 'expo-router';


const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="form" options={{ headerShown: false }} />
        <Stack.Screen name="userlist" options={{ headerShown: false }} />
      </Stack>
  );
}

export default Layout;