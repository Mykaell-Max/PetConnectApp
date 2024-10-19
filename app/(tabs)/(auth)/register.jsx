import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, TextInput, Alert} from 'react-native';
import { createUser } from '../../../services/userService';
import { useAuth } from '../../../contexts/authContext';
import { useRouter } from 'expo-router';
import BlackButton from '../../../components/BlackButton';


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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Registrar novo usuario:</Text>

        <Text>Nome:</Text>
        <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => handleChange('name', text)}
        />

        <Text>Sobrenome:</Text>
        <TextInput
            style={styles.input}
            value={userData.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
        />

        <Text>Email:</Text>
        <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={(text) => handleChange('email', text)}
        />

        <Text>Senha:</Text>
        <TextInput
            style={styles.input}
            value={userData.password}
            onChangeText={(text) => handleChange('password', text)}
        />

        <Text>Cidade:</Text>
        <TextInput
            style={styles.input}
            value={userData.address.city}
            onChangeText={(text) => handleAddressChange('city', text)}
        />

        <Text>Bairro</Text>
        <TextInput
            style={styles.input}
            value={userData.address.neighborhood}
            onChangeText={(text) => handleAddressChange('neighborhood', text)}
        />

        <BlackButton text='Registrar' onPress={handleRegister} loading={loading} disabled={loading} />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingBottom: 0,
      padding: 10,
      backgroundColor: '#fff',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 15,
      borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
},
  picturesContainer: {
    marginTop: 20,
  },
  pictureWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picture: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
},
});