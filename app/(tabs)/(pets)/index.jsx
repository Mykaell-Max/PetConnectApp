import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';
import { fetchPets } from '../../../services/petService';
import PetList from '../../../components/PetList';
import BlackButton from '../../../components/BlackButton';
import * as Font from 'expo-font';
import colors from '../../../styles/colors';


export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [pets, setPets] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
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
        setError('Erro ao buscar pets'); 
      } finally {
        setLoading(false); 
      }
    };

    loadPets();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.black }}>
        <ActivityIndicator size="large" color={colors.yellow} /> 
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.black }}>
        <ActivityIndicator size="large" color={colors.yellow} /> 
      </View>
    ); 
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.BigText}>Junte-se à nossa comunidade:</Text>

      <BlackButton text='Doe animais!'/>

      <Text style={commonStyles.BigText}>Animais esperando um lar:</Text>

      <PetList pets={pets} />
    </View>
  );
}