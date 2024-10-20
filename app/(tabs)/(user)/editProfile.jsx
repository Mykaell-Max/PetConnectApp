import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../../../contexts/authContext';
import * as ImagePicker from 'expo-image-picker';
import { fetchSingleUser, updateUser, uploadProfilePicture } from '../../../services/userService'; // Função para buscar e atualizar usuário
import colors from '../../../styles/colors';
import commonStyles from '../../../styles/commonStyles';
import BlackButton from '../../../components/BlackButton';
import { useRouter } from 'expo-router';

export default function EditUserProfile({ navigation }) {
  const router = useRouter();
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [newPic, setNewPic] = useState(null);
  const [isUploading, setIsUploading] = useState(false); 
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    description: '',
    city: '',
    neighborhood: '',
    socialMedias: '',
  });

  useEffect(() => {
    const loadUser = async (userId) => {
      try {
        const data = await fetchSingleUser(userId);
        setUser(data);
        setForm({
          name: data.name || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          description: data.description || '',
          city: data.address?.city || '',
          neighborhood: data.address?.neighborhood || '',
          socialMedias: data.socialMedias ? data.socialMedias.join(', ') : '',
        });
        setProfilePicture(data.profilePicture);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar informações do usuário.');
      } finally {
        setLoading(false);
      }
    };

    loadUser(userId);
  }, [userId]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

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

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Precisamos de permissão para acessar sua galeria');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      selectionLimit: 1,  
      quality: 1,
    });

    if (!result.canceled) {
      setNewPic(result.assets[0])
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if(newPic){
        try {
          
          const pictureFile = await createFileFromUri(newPic);
         
          const response = await uploadProfilePicture(userId, pictureFile);
        } catch (error) {
          Alert.alert('Erro', `Erro ao atualizar a foto de perfil: ${error.message}`);
          return
        }
        
      }
      const updatedUser = {
        ...form,
        socialMedias: form.socialMedias.split(',').map((media) => media.trim()), 
      };
      const response = await updateUser(userId, updatedUser);

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        setLoading(false);
        router.back();
      } else {
        
        Alert.alert('Erro', 'Erro ao atualizar perfil.');
      }
    } catch (error) {

      Alert.alert('Erro', 'Erro ao atualizar perfil.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView >
      <Text style={styles.headerText}>Editar Perfil</Text>

      <TouchableOpacity style={styles.profilePictureContainer} onPress={handleImagePicker}>
        <Image
          source={
            profilePicture
              ? { uri: profilePicture }
              : require('../../../assets/images/default-profile.png')
          }
          style={styles.profilePicture}
        />
        <Text style={styles.changePictureText}>Alterar Imagem de Perfil</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <Text style={styles.label}>Sobrenome:</Text>
      <TextInput
        style={styles.input}
        value={form.lastName}
        onChangeText={(value) => handleInputChange('lastName', value)}
      />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={form.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
        // keyboardType="phone-pad"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={form.description}
        onChangeText={(value) => handleInputChange('description', value)}
        multiline
      />

      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={form.city}
        onChangeText={(value) => handleInputChange('city', value)}
      />

      <Text style={styles.label}>Bairro:</Text>
      <TextInput
        style={styles.input}
        value={form.neighborhood}
        onChangeText={(value) => handleInputChange('neighborhood', value)}
      />

      <Text style={styles.label}>Redes Sociais:</Text>
      <TextInput
        style={styles.input}
        value={form.socialMedias}
        onChangeText={(value) => handleInputChange('socialMedias', value)}
      />

      <BlackButton text="Salvar Alterações" onPress={handleSubmit} color={colors.yellow} loading={loading} disabled={loading} />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.lightBackground,
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.black,
  },
  changePictureText: {
    marginTop: 10,
    color: colors.blue,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.black,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
