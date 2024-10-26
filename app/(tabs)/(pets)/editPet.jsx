import { Text, View, TextInput, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView, Alert, Switch, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import commonStyles from '../../../styles/commonStyles';
import { useLocalSearchParams } from 'expo-router'; 
import { fetchSinglePet, updatePet, deletePet, deletePetPicture} from '../../../services/petService';
import colors from '../../../styles/colors';
import BlackButton from '../../../components/BlackButton';
import { useAuth } from '../../../contexts/authContext';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function EditPet() {
  const { petId } = useLocalSearchParams();
  // const { userId } = useAuth();
  const [pet, setPet] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [newPictures, setNewPictures] = useState([]);
  
  const navigation = useNavigation();

  const goToMainPage = () => {
    navigation.navigate('index');  
  };

  useEffect(() => {
    const loadPet = async (petId) => {
        try {
            const data = await fetchSinglePet(petId);
            setPet(data); 
        } catch (error) {
            setError(`Erro ao buscar pet: ${error.message}`)
        } finally {
            setLoading(false);
        }
    }

    loadPet(petId);
  }, []);

  const createFileFromUri = async (image) => {
    try {
      const response = await fetch(image.uri); 
      const blob = await response.blob(); 
      return {
        uri: image.uri,
        name: image.fileName, 
        type: image.mimeType, 
        blob: blob
      };  
    } catch (error) {
        throw error;
    } 
  };

  const handleUpdatePet = async () => {
    setLoading(true);
    try {
        if (newPictures.length > 0){
          const pictureFiles = await Promise.all(newPictures.map(async (picture) => {
            return await createFileFromUri(picture); 
          }));
          await updatePet(petId, pet, pictureFiles);  
          Alert.alert('Sucesso', 'Informações do pet atualizadas com sucesso!');
        } else {
          await updatePet(petId, pet);
          Alert.alert('Sucesso', 'Informações do pet atualizadas com sucesso!');
        }
    } catch (error) {
        Alert.alert('Erro', `Erro ao atualizar pet: ${error.message}`);
    } finally {
        setLoading(false);
    }
  }

  const handleDeletePet = async () => {
    setLoading(true);
    try {
      await deletePet(petId);
      Alert.alert('Sucesso', 'Pet deletado com sucesso!')
      goToMainPage();
    } catch (error) {
      Alert.alert('Erro', `Erro ao deletar pet: ${error.message}`);
    }
  }

  const handleRemovePicture = async (picture) => {
    const pictureUrl = typeof picture === 'string' ? picture : picture.uri;
    const isImageInDB = pet.pictures.includes(pictureUrl);
    try {
        if (isImageInDB) {
            await deletePetPicture(petId, pictureUrl); 
            setPet((prevPet) => ({
              ...prevPet,
              pictures: prevPet.pictures.filter((img) => img !== pictureUrl),
            }));
        }
        setNewPictures((prevPictures) => prevPictures.filter((img) => img.uri !== pictureUrl));
        Alert.alert('Sucesso', 'Imagem removida com sucesso!');
    } catch (error) {
        Alert.alert('Erro', `Erro ao remover imagem: ${error.message}`);
    }
    
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
        selectionLimit: 5 - pet.pictures.length,  
        quality: 1,
      });
  
      if (result.canceled) {
        return;
      }

      if (result.assets && result.assets.length > 0) {
        setNewPictures((prevPictures) => [...prevPictures, ...result.assets]);
      } else {
        console.log('Nenhuma imagem foi selecionada');
      }
    } catch (error) {
      console.log('Erro ao selecionar imagens:', error);
    }
  };

  if (loading) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.yellow} /> 
          </View>
      ); 
  }

  if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
      <SafeAreaView style={commonStyles.viewSafe}>
          <ScrollView>
            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Nome</Text>
              <TextInput
                style={[commonStyles.input]}
                placeholder="Digite o nome do pet"
                value={pet.name}
                onChangeText={(text) => setPet({ ...pet, name: text })}
                keyboardType="text"
                autoCapitalize="words"
              />
            </View>

            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Idade</Text>
              <TextInput
                style={[commonStyles.input]}
                placeholder="Digite a idade do pet"
                value={pet.age}
                onChangeText={(text) => setPet({ ...pet, age: text })}
                keyboardType="text"
                autoCapitalize="words"
              />
            </View>

            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Tamanho</Text>
              <TextInput
                style={[commonStyles.input]}
                placeholder="Digite o porte do pet"
                value={pet.size}
                onChangeText={(text) => setPet({ ...pet, size: text })}
                keyboardType="text"
                autoCapitalize="words"
              />
            </View>

            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Sexo</Text>
              <TextInput
                style={[commonStyles.input]}
                placeholder="Digite o nome do pet"
                value={pet.sex}
                onChangeText={(text) => setPet({ ...pet, sex: text })}
                keyboardType="text"
                autoCapitalize="words"
              />
            </View>
                  
            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Castrado: </Text>
              <Switch style={styles.switchContainer}
                  value={pet.neutered} 
                  onValueChange={(value) => setPet({ ...pet, neutered: value })}
                  trackColor={{ false: colors.gray, true: colors.green }}
                  thumbColor={pet.neutered ? colors.white : colors.lightGray}
              />
            </View>

            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Sobre</Text>
              <TextInput
                style={[commonStyles.input]}
                placeholder="Digite uma descrição para o pet"
                value={pet.about}
                onChangeText={(text) => setPet({ ...pet, about: text })}
                keyboardType="text"
                autoCapitalize="words"
              />
            </View>
            
            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Cidade</Text>
              <TextInput
                style={[commonStyles.input]}
                placeholder="Digite a cidade em que o pet se encontra"
                value={pet.address.city}
                onChangeText={(text) => setPet({ ...pet, address: { ...pet.address, city: text } })}
                keyboardType="text"
                autoCapitalize="none"
              />
            </View>

            <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Bairro</Text>
              <TextInput
                style={[commonStyles.input]}
                placeholder="Digite o bairro em que o pet se encontra"
                value={pet.address.neighborhood}
                onChangeText={(text) => setPet({ ...pet, address: { ...pet.address, neighborhood: text } })}
                keyboardType="text"
                autoCapitalize="none"
              />
            </View>
                  
              <Text style={styles.label}>Imagens:</Text>
              <View style={styles.picturesContainer}>
                  {pet.pictures.map((picture, index) => (
                      <View key={index} style={styles.pictureWrapper}>
                        <Image source={{ uri: picture }} style={styles.picture} />
                        <BlackButton text="Remover" onPress={() => handleRemovePicture(picture)} />
                      </View>
                  ))}

                  {newPictures.map((picture, index) => (
                      <View key={index} style={styles.pictureWrapper}>
                        <Image source={{ uri: picture.uri }} style={styles.picture} />
                        <BlackButton text="Remover" onPress={() => handleRemovePicture(picture)} />
                      </View>
                  ))}
              </View>
              
              <BlackButton text="Adicionar Imagens" onPress={handleSelectPictures} />

              <BlackButton text={'Salvar'} onPress={handleUpdatePet} loading={loading} disabled={loading} />

              <BlackButton text={'Deletar pet'} onPress={handleDeletePet} loading={loading} disabled={loading} />

          </ScrollView> 
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.black,
  },
  errorText: {
      color: colors.red,
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
  },
  container: {
      padding: 14,
      backgroundColor: colors.lightBackground,
  },
  detailsContainer: {
      padding: 16,
      backgroundColor: colors.white,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginVertical: 20,
  },
  label: {
      fontSize: 18,
      fontFamily: 'SchoolBell',
      color: colors.textDark,
      marginVertical: 4,
  },
  input: {
      height: 40,
      borderColor: colors.gray,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      fontSize: 16,
  },
  picturesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 10,
  },
  pictureWrapper: {
      position: 'relative',
      margin: 5,
  },
  picture: {
      width: 100,
      height: 100,
      borderRadius: 10,
  },
});