import { Stack } from 'expo-router';

export default function chatLayout() {
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
      <Stack.Screen name="chatsPreview" options={{ title: 'Chats Preview' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat' }} />
    </Stack>
  );
}