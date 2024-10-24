import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Alert, ScrollView, Switch, SafeAreaView, View, Image, ActivityIndicator   } from 'react-native';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createPet } from '../../../services/petService';
import BlackButton from '../../../components/BlackButton';
import { useAuth } from '../../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotLogged from '../../../components/NotLogged';
import commonStyles from '../../../styles/commonStyles';

export default function RegisterPet () {
  const { isLoggedIn, userId} = useAuth();
  const [petData, setPetData] = useState({
      petSpecie: '',
      name: '',
      age: '',
      size: '',
      sex: '',
      neutered: false,
      about: '',
      healthIssues: '',
      address: {
          city: '',
          neighborhood: '',
      },
      donor: '', 
  });

  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
      setPetData((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  };

  const handleAddressChange = (name, value) => {
      setPetData((prevState) => ({
          ...prevState,
          address: {
              ...prevState.address,
              [name]: value,
          },
      }));
  };

  const handleSelectPictures = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Precisamos de permissão para acessar sua galeria');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: 'photo',
        allowsMultipleSelection: true,
        selectionLimit: 5,  
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
      });
  
      if (result.canceled) {
        return;
      }

      if (result.assets && result.assets.length > 0) {
        setPictures((prevPictures) => [...prevPictures, ...result.assets]);
      } else {
        console.log('Nenhuma imagem foi selecionada');
      }
    } catch (error) {
      console.log('Erro ao selecionar imagens:', error);
    }
  };
  

  const handleRemovePicture = (index) => {
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
  };

  const createFileFromUri = async (image) => {
    const response = await fetch(image.uri); 
    const blob = await response.blob(); 
    return {
      uri: image.uri,
      name: image.fileName, 
      type: image.mimeType, 
      blob: blob
    };
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
        // const id = await AsyncStorage.getItem('userId');
        const pictureFiles = await Promise.all(pictures.map(async (picture) => {
            return await createFileFromUri(picture); 
        }));
        const updatedPetData = {
          ...petData,
          donor: userId,  
        };
        // console.log(userId)
        await createPet(updatedPetData, pictureFiles);
        Alert.alert('Success', 'Pet successfully registered!');
    } catch (error) {
        Alert.alert('Error', `Error: ${error.message}`);
    } finally {
      setLoading(false); 
    }
  };

  if (!isLoggedIn) {
    return <NotLogged />;
  }

  return (
    <SafeAreaView style={commonStyles.viewSafe}>
      <ScrollView>
        <Text style={commonStyles.BigText}>Registre um pet para doar:</Text>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Nome</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite o nome do pet"
            value={petData.name}
            onChangeText={(text) => handleChange('name', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Idade (exata ou aproximada)</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite a idade do pet"
            value={petData.age}
            onChangeText={(text) => handleChange('age', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Porte</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite o porte do pet"
            value={petData.size}
            onChangeText={(text) => handleChange('size', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>
        
        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Sexo</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite o sexo do pet"
            value={petData.sex}
            onChangeText={(text) => handleChange('sex', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Castrado: </Text>
          <Switch style={styles.switchContainer}
              value={petData.neutered}
              onValueChange={(value) => handleChange('neutered', value)}
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Sobre</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Dê uma breve descrição do pet"
            value={petData.about}
            onChangeText={(text) => handleChange('about', text)}
            keyboardType="text"
            autoCapitalize="none"
            numberOfLines={4}
          />
        </View>
        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Cidade</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite a cidade em que o pet se encontra"
            value={petData.address.city}
            onChangeText={(text) => handleAddressChange('city', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Bairro</Text>
          <TextInput
            style={[commonStyles.input]}
            placeholder="Digite o bairro em que o pet se encontra"
            value={petData.address.neighborhood}
            onChangeText={(text) => handleAddressChange('neighborhood', text)}
            keyboardType="text"
            autoCapitalize="none"
          />
        </View>

        <BlackButton text='Selecionar fotos' onPress={handleSelectPictures} />

        <View style={styles.picturesContainer}>
              {pictures.map((picture, index) => (
                  <View key={index} style={styles.pictureWrapper}>
                      <Image source={{ uri: picture.uri }} style={styles.picture} />
                      <BlackButton text="Remove" onPress={() => handleRemovePicture(index)} />
                  </View>
              ))}
        </View>

        <BlackButton text='Registrar Pet' onPress={handleSubmit} loading={loading} disabled={loading} />
    </ScrollView>
    </SafeAreaView>
  );
};

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
//   switchContainer: {
//     flexDirection: 'row',
//     alignItems: 'left',
//     justifyContent: 'space-between',
//     marginBottom: 15,
// },
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