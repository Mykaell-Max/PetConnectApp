import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Alert} from 'react-native';
import { Link, useRouter } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';
import BlackButton from '../../../components/BlackButton';
import { useAuth } from '../../../contexts/authContext'; 
import { loginUser } from '../../../services/authService';

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (isLoggedIn) {
      router.back(); 
    }
  }, [isLoggedIn]);
  
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { token, userId } = await loginUser(email, password);
      login(token, userId);
      Alert.alert('Sucesso', 'Login feito com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Credenciais incorretas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>Faça o login em sua conta</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={commonStyles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <BlackButton
            text={loading ? 'Carregando...' : 'Login'}
            onPress={handleLogin}
            disabled={loading}
          />

          <Text>Não possui uma conta?</Text>
          <Link href='/register'>Registrar</Link>
    </View>
  );
}
