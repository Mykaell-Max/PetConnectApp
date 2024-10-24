import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, TextInput, Alert} from 'react-native';
import { createUser } from '../../../services/userService';
import { useAuth } from '../../../contexts/authContext';
import { useRouter } from 'expo-router';
import BlackButton from '../../../components/BlackButton';
import commonStyles from '../../../styles/commonStyles';


export default function Register() {
  const { login, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [userData, setuserData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    address: {
        city: '',
        neighborhood: '',
    },
  });

  const handleChange = (name, value) => {
    setuserData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  };

  const handleAddressChange = (name, value) => {
    setuserData((prevState) => ({
        ...prevState,
        address: {
            ...prevState.address,
            [name]: value,
        },
    }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.back(); 
    }
  }, [isLoggedIn]);

  const handleRegister = async () => {
    setLoading(true);
    try {
        const { token, user } = await createUser(userData);
        Alert.alert('Success', 'User successfully registered!');
        login(token, user._id)
    } catch (error) {
        Alert.alert('Error', `Error: ${error.message}`);
    } finally {
      setLoading(false); 
    }
  };
  
  return (
    <SafeAreaView style={commonStyles.viewSafe}>
      <ScrollView>
        <Text style={commonStyles.BigText}>Registrar novo usuário:</Text>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Nome</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite seu nome"
            value={userData.name}
            onChangeText={(text) => handleChange('name', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>
        
        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Sobrenome</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite seu sobrenome"
            value={userData.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Email</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite seu email"
            value={userData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Senha</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite sua senha"
            value={userData.password}
            onChangeText={(text) => handleChange('password', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Cidade</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite sua cidade"
            value={userData.address.city}
            onChangeText={(text) => handleAddressChange('city', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Bairro</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite seu bairro"
            value={userData.address.neighborhood}
            onChangeText={(text) => handleAddressChange('neighborhood', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <BlackButton text='Registrar' onPress={handleRegister} loading={loading} disabled={loading} />
    </ScrollView>
    </SafeAreaView>
  );
}