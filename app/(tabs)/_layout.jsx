import { Tabs } from 'expo-router';
import { Image, StatusBar } from 'react-native';
import colors from '../../styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <>
    <StatusBar barStyle="dark-content" />

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.black,
        headerStyle: {
          backgroundColor: colors.white
        },
        headerTitle: () => (
          <Image
            source={require('../../assets/images/logo_w.png')}
            style={{ width: 140, height: 80 }}
            resizeMode="contain"
          />
        ),
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.white,
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
    </>
  );
}