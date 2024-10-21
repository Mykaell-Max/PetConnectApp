import { Text, View, Image, Button, Alert, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../../styles/colors';
import { fetchPets } from '../../../services/petService';
import { useAuth } from '../../../contexts/authContext';
import PetList from '../../../components/PetList';
import commonStyles from '../../../styles/commonStyles';

export default function adoptionRequests() {
    const { userId } = useAuth();  
    const [pets, setPets] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    

    useEffect(() => {
        const loadPets = async () => {  
          try {
            const data = await fetchPets(`adoptionRequests=${userId}`);  
            setPets(data); 
          } catch (error) {
            console.log(error);
            setError('Erro ao buscar pets');  
          } finally {
            setLoading(false); 
          }
        };
    
        loadPets();  
    }, [userId]);  

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.black }}>
            <ActivityIndicator size="large" color={colors.yellow} /> 
          </View>
        ); 
    }
    
    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={commonStyles.BigText}>Suas solicitações de adoção:</Text>
            <PetList pets={pets} />
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
