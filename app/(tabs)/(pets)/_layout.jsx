import { Stack } from 'expo-router';

export default function PetsLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: 'Pets', headerShown: false}} />
        <Stack.Screen name="registerPet" options={{ title: 'Register Pet', headerShown: false}} />
        <Stack.Screen name="petDetail" options={{ title: 'Pet Detail', headerShown: false }} />
        <Stack.Screen name="editPet" options={{ title: 'Edit Pet', headerShown: false }} />
    </Stack>
  );
}
