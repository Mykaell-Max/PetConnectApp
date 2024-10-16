import { Stack } from 'expo-router';

export default function petLayout() {
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
        <Stack.Screen name="registerPet" options={{ title: 'Register Pet'}} />
        <Stack.Screen name="petDetail" options={{ title: 'Pet Detail' }} />
        <Stack.Screen name="editPet" options={{ title: 'Edit Pet' }} />
    </Stack>
  );
}
