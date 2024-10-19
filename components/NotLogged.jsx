import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import BlackButton from '../components/BlackButton';

export default function NotLogged() {
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push({ pathname: '../(auth)/login' });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Para acessar essa funcionalidade, você precisa estar logado em uma conta!</Text>
            <BlackButton text="Faça o login" onPress={handleLoginRedirect} />
        </View>
    );
}
