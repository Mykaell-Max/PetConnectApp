import { Stack } from 'expo-router';

export default function petLayout() {
  return (
    <Stack>
        <Stack.Screen name="registerPet" options={{ title: 'Register Pet', headerShown: false}} />
        <Stack.Screen name="petDetail" options={{ title: 'Pet Detail', headerShown: false }} />
        <Stack.Screen name="editPet" options={{ title: 'Edit Pet', headerShown: false }} />
    </Stack>
  );
}
