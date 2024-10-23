import { View, Text, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router'; 
import { useNavigation } from '@react-navigation/native';

import { fetchSinglePet, addAdoptionRequest, removeAdoptionRequest } from '../../../services/petService';
import colors from '../../../styles/colors';
import commonsStyles from '../../../styles/commonStyles';
import PetCarousel from '../../../components/petCarousel';
import BlackButton from '../../../components/BlackButton';
import { useAuth } from '../../../contexts/authContext';
import Loading from '../../../components/Loading';


export default function PetDetail() {
    const navigation = useNavigation();

    const { petId } = useLocalSearchParams();
    const { userId } = useAuth();

    const [pet, setPet] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [hasRequested, setHasRequested] = useState(false);

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
                Alert.alert('Error', `Erro ao buscar pets: ${error}`) 
            } finally {
                setLoading(false);
            }
        }
        loadPet(petId);
    }, []);

    const goToEditPet = () => {
        navigation.navigate('editPet', {petId: petId});  
      };

    const handleAddAdoptionRequest = async () => {
        setLoading(true);
        try {
            await addAdoptionRequest(petId, userId);
            Alert.alert('Sucesso', 'Pedido de adoção enviado com sucesso!')
            setHasRequested(true);
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert('Erro', 'Você não pode adotar o próprio pet.');
            } else {
                Alert.alert('Erro', `Error: ${error.message}`);
            }
            const updatedPet = await fetchSinglePet(petId);
            setPet(updatedPet);
            setLoading(false);
        }
    }

    const handleRemoveAdoptionRequest = async () => {
        setLoading(true);
        try {
            await removeAdoptionRequest(petId, userId);
            Alert.alert('Sucesso', 'Pedido de adoção removido com sucesso!')
            setHasRequested(false);
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', `Error: ${error.message}`)
            setLoading(false);
        }
    }


    if (loading) {
        return <Loading/>;
    }

    return (
        <SafeAreaView style={commonsStyles.viewSafe}>

        <ScrollView nestedScrollEnabled={true} style={styles.scrolls}>

            {/* <View style={styles.detailsContainer}> */}

                <PetCarousel petImages={pet.pictures} />
                
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petDetail}>Idade: {pet.age}</Text>
                <Text style={styles.petDetail}>Espécie: {pet.petSpecie}</Text>
                <Text style={styles.petDetail}>Tamanho: {pet.size}</Text>
                <Text style={styles.petDetail}>Sexo: {pet.sex}</Text>
                <Text style={styles.petDetail}>Castrado: {pet.neutered ? 'Sim' : 'Não'}</Text>
                <Text style={styles.petDetail}>Sobre: {pet.about}</Text>
                <Text style={styles.petDetail}>Local atual: {pet.address.neighborhood}, {pet.address.city} </Text>
                {pet.healthIssues && (
                    <Text style={styles.de}>
                        Problemas de Saúde: {pet.healthIssues.join(', ')}
                    </Text>
                )}

            {/* </View> */}
            
            {hasRequested ? (
                <BlackButton text={'Remover solicitação'} onPress={handleRemoveAdoptionRequest} loading={loading} disabled={loading}/>
            ) : (
                <BlackButton text={'Solicitar adoção'} onPress={handleAddAdoptionRequest} loading={loading} disabled={loading}/>
            )}

            {(String(userId) === String(pet.donor)) ? (
                <BlackButton text={'Editar pet'} onPress={goToEditPet}/>
            ) : null}

        </ScrollView> 

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrolls: {
        backgroundColor: colors.yellow,
        padding: 4
    },
    petName: {
        fontSize: 36,
        fontFamily: 'SchoolBell',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    petDetail: {
        fontSize: 18,
        fontFamily: 'SchoolBell',
        color: colors.textDark,
        marginVertical: 4,
    },
});
