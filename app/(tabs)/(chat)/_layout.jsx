import { Stack } from 'expo-router';

export default function chatLayout() {
  return (
    <Stack>
      <Stack.Screen name="chatsPreview" options={{ title: 'Chats Preview', headerShown: false }} />
      <Stack.Screen name="chat" options={{ title: 'Chat', headerShown: false }} />
    </Stack>
  );
}