import { Stack } from 'expo-router';

export default function userLayout() {
  return (
    <Stack>
      <Stack.Screen name="userProfile" options={{ title: 'User Profile', headerShown: false }} />
      <Stack.Screen name="editProfile" options={{ title: 'Edit Profile', headerShown: false }} />
      <Stack.Screen name="registeredPets" options={{ title: 'Registered Pets', headerShown: false }} />
      <Stack.Screen name="adoptionRequests" options={{ title: 'Adoption Requests', headerShown: false }} />
    </Stack>
  );
}

