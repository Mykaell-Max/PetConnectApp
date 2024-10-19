import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Alert, ScrollView, Switch, SafeAreaView, View, Image, ActivityIndicator   } from 'react-native';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createPet } from '../../../services/petService';
import BlackButton from '../../../components/BlackButton';
import { useAuth } from '../../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotLogged from '../../../components/NotLogged';

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Registre um pet para doar:</Text>

        <Text>Pet Specie:</Text>
        <TextInput
            style={styles.input}
            value={petData.petSpecie}
            onChangeText={(text) => handleChange('petSpecie', text)}
        />

        <Text>Name:</Text>
        <TextInput
            style={styles.input}
            value={petData.name}
            onChangeText={(text) => handleChange('name', text)}
        />

        <Text>Age:</Text>
        <TextInput
            style={styles.input}
            value={petData.age}
            onChangeText={(text) => handleChange('age', text)}
        />

        <Text>Size:</Text>
        <TextInput
            style={styles.input}
            value={petData.size}
            onChangeText={(text) => handleChange('size', text)}
        />

        <Text>Sex:</Text>
        <TextInput
            style={styles.input}
            value={petData.sex}
            onChangeText={(text) => handleChange('sex', text)}
        />

        <Text>Neutered:</Text>
        <Switch style={styles.switchContainer}
            value={petData.neutered}
            onValueChange={(value) => handleChange('neutered', value)}
        />

        <Text>About:</Text>
        <TextInput
            style={styles.input}
            value={petData.about}
            onChangeText={(text) => handleChange('about', text)}
            multiline
            numberOfLines={4}
        />

        <Text>Health Issues:</Text>
        <TextInput
            style={styles.input}
            value={petData.healthIssues}
            onChangeText={(text) => handleChange('healthIssues', text)}
        />

        <Text>City:</Text>
        <TextInput
            style={styles.input}
            value={petData.address.city}
            onChangeText={(text) => handleAddressChange('city', text)}
        />

        <Text>Neighborhood:</Text>
        <TextInput
            style={styles.input}
            value={petData.address.neighborhood}
            onChangeText={(text) => handleAddressChange('neighborhood', text)}
        />

        <BlackButton text='Select Pictures' onPress={handleSelectPictures} />

        <View style={styles.picturesContainer}>
              {pictures.map((picture, index) => (
                  <View key={index} style={styles.pictureWrapper}>
                      <Image source={{ uri: picture.uri }} style={styles.picture} />
                      <BlackButton text="Remove" onPress={() => handleRemovePicture(index)} />
                  </View>
              ))}
        </View>

        <BlackButton text='Register Pet' onPress={handleSubmit} loading={loading} disabled={loading} />
        {/* {message && <Text>{message}</Text>} */}
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