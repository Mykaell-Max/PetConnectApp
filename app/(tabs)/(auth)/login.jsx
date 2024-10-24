import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Alert, SafeAreaView} from 'react-native';
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
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha os campos corretamente.');
      return;
    }
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
    <SafeAreaView style={commonStyles.viewSafe}>
      <Text style={commonStyles.BigText}>Faça o login em sua conta</Text>

      <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Email</Text>
        <TextInput
          style={[commonStyles.input]}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Senha</Text>
        <TextInput
          style={[commonStyles.input]}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <BlackButton
        text={loading ? 'Carregando...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />

      <Text style={commonStyles.text}>Não possui uma conta?</Text>
      <Link href='/register' style={commonStyles.linkText}>Registrar</Link>
    </SafeAreaView>
  );
}
