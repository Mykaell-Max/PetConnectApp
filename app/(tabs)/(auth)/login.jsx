import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import commonStyles from '../../../styles/commonStyles';

import { useAuth } from '../../../contexts/authContext'; 
import { loginUser } from '../../../services/authService';

export default function Login() {
  const { isLoggedIn, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { token } = await loginUser(email, password);
      login(token);
      Alert.alert('Sucesso', 'Login feito com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Credenciais incorretas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    Alert.alert('Sucesso', 'Logout realizado com sucesso!');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>LOGIN AQUI</Text>
      
      {isLoggedIn ? (
        <>
          <Text style={commonStyles.text}>Você já está logado!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text style={commonStyles.text}>Você não está logado</Text>

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

          <Button
            title={loading ? 'Carregando...' : 'Login'}
            onPress={handleLogin}
            disabled={loading}
          />
        </>
      )}
    </View>
  );
}
