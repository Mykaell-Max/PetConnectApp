import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import colors from '../../styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.black
        },
        headerTitle: () => (
          <Image
            source={require('../../assets/images/logo_y.png')}
            style={{ width: 140, height: 80 }}
            resizeMode="contain"
          />
        ),
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: colors.yellow,
        tabBarStyle: {
          backgroundColor: colors.black,
        },
      }}
    >
      
      <Tabs.Screen name="(pets)" options={{ title: 'Início',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ),
      }}/>

      <Tabs.Screen name="(chat)" options={{ title: 'Conversas',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'chatbubble-sharp' : 'chatbubble-outline'} color={color} size={24} />
        ), 
      }}/>

      <Tabs.Screen name="(user)" options={{ title: 'Perfil', 
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'person-circle-sharp' : 'person-circle-outline'} color={color} size={24} />
        ),
      }}/>

      <Tabs.Screen name="settings" options={{ title: 'Configurações', 
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
        ),
      }}/>
      
      <Tabs.Screen name="(auth)/login" options={{ title: 'Login', href: null }} />
      <Tabs.Screen name="(auth)/register" options={{ title: 'Register', href: null }} />

    </Tabs>
  );
}