import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../styles/commonStyles';
import { fetchPets } from '../../services/petService';


export default function HomeScreen() {
  const [pets, setPets] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; 
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>AQUI É A PAGINA PRINCIPAL DO APLICATIVO, OS ANIMAL VAI FICAR LISTADO AQUI</Text>

      <FlatList 
        data={pets}
        renderItem={({ item }) => (
          <Text>{item.name} = {item.about}</Text>
        )}
      />

      <Link href="/(auth)/register" style={commonStyles.button}>
        register screen
      </Link>

      <Link href="/(auth)/login" style={commonStyles.button}>
        login screen
      </Link>

      <Link href="/(pets)/petDetail" style={commonStyles.button}>
        pet screen
      </Link>

    </View>
  );
}