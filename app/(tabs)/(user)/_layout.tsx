import { Stack } from 'expo-router';

export default function userLayout() {
  return (
    <Stack
      screenOptions={{
      headerStyle: {
        backgroundColor: '#25292e',
      },
      headerShadowVisible: false,
      headerTintColor: '#fff'
    }}
    >
      <Stack.Screen name="userProfile" options={{ title: 'User Profile' }} />
      <Stack.Screen name="editProfile" options={{ title: 'Edit Profile' }} />
    </Stack>
  );
}

