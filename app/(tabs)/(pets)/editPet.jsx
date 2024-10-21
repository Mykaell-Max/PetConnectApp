import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import commonStyles from '../../../styles/commonStyles';
import { useLocalSearchParams } from 'expo-router'; 
import { fetchSinglePet } from '../../../services/petService';

export default function editPet() {
  const { petId } = useLocalSearchParams();
  const [pet, setPet] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadPet = async (petId) => {
        try {
            const data = await fetchSinglePet(petId);
            setPet(data); 
            if (data.adoptionRequests.includes(userId)) {
                setHasRequested(true);  
            } else {
                setHasRequested(false); 
            }
        } catch (error) {
            setError(`Erro ao buscar pet: ${error.message}`)
        } finally {
            setLoading(false);
        }
    }

    loadPet(petId);
}, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>TELA PARA EDITAR INFORMAÇÕES DE UM PET {petId}</Text>
    </View>
  );
}