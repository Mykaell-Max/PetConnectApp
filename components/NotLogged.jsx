import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import BlackButton from '../components/BlackButton';
import colors from '../styles/colors';

export default function NotLogged() {
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push({ pathname: '../(auth)/login' });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.blueLight}}>
            <Text style={{fontFamily: 'SchoolBell', fontSize: 18, textAlign: 'center'}}>Para acessar essa funcionalidade, você precisa estar logado em uma conta!</Text>
            <BlackButton text="Faça o login" onPress={handleLoginRedirect} />
        </View>
    );
}
