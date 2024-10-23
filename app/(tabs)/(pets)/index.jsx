import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, SafeAreaView, Alert } from 'react-native';
import * as Font from 'expo-font';

import { fetchPets } from '../../../services/petService';
import commonStyles from '../../../styles/commonStyles';
import PetList from '../../../components/PetList';
import BlackButton from '../../../components/BlackButton';
import Loading from '../../../components/Loading';


export default function HomeScreen() {
  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [pets, setPets] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'SchoolBell': require('../../../assets/fonts/Schoolbell-Regular.ttf'), 
      });
      setFontsLoaded(true); 
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const data = await fetchPets(); 
        setPets(data); 
      } catch (error) {
        Alert.alert('Error', `Erro ao buscar pets: ${error}`) 
      } finally {
        setLoading(false); 
      }
    };

    loadPets();
  }, []);

  const goToPetRegister = () => {
    navigation.navigate('registerPet');  
  };

  if (!fontsLoaded || loading) {
    return <Loading/>;
  };

  return (
    <SafeAreaView style={commonStyles.viewSafe}>

      <Text style={commonStyles.BigText}>Junte-se à nossa comunidade:</Text>

      <BlackButton text='Doe animais!' onPress={goToPetRegister}/>

      <Text style={commonStyles.BigText}>Animais esperando um lar:</Text>

      <PetList pets={pets} />
      
    </SafeAreaView>
  );
}