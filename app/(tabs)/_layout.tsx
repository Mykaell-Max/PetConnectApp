import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        backgroundColor: '#25292e',
        },
      }}
    >
      
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="(chat)" options={{ title: 'Chats' }} />
      <Tabs.Screen name="(user)" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />

      <Tabs.Screen name="(pets)" options={{ title: 'Profile', href: null }} />
      
      <Tabs.Screen name="(auth)/login" options={{ title: 'Login', href: null }} />
      <Tabs.Screen name="(auth)/register" options={{ title: 'Register', href: null }} />

    </Tabs>
  );
}