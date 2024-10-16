import { Tabs } from 'expo-router';
import colors from '../../styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.yellow,
        headerStyle: {
          backgroundColor: colors.blueDark
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: colors.blueDark,
        },
      }}
    >
      
      <Tabs.Screen name="index" options={{ title: 'Home',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ),
      }}/>

      <Tabs.Screen name="(chat)" options={{ title: 'Chats',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'chatbubble-sharp' : 'chatbubble-outline'} color={color} size={24} />
        ), 
      }}/>

      <Tabs.Screen name="(user)" options={{ title: 'Profile', 
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'person-circle-sharp' : 'person-circle-outline'} color={color} size={24} />
        ),
      }}/>

      <Tabs.Screen name="settings" options={{ title: 'Settings', 
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
        ),
      }}/>
      
      <Tabs.Screen name="(pets)" options={{ title: 'Pets', href: null }} />
      
      <Tabs.Screen name="(auth)/login" options={{ title: 'Login', href: null }} />
      <Tabs.Screen name="(auth)/register" options={{ title: 'Register', href: null }} />

    </Tabs>
  );
}