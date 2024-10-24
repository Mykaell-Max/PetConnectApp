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
import NotLogged from '../../../components/NotLogged';


export default function PetDetail() {
    const navigation = useNavigation();
    const { petId } = useLocalSearchParams();
    const { userId, isLoggedIn } = useAuth();

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
        if (!isLoggedIn) {
            Alert.alert('Atenção', 'Você precisa estar logado para solicitar a adoção.');  // Mostra mensagem de não logado
            return;
        }
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

                    <PetCarousel petImages={pet.pictures} style={styles.petImage}/>

                    <View style={styles.detailContainer}>
                        <Text style={styles.petName}>{pet.name}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>Idade:</Text>
                        <Text style={styles.detailValue}>{pet.age}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>Sexo:</Text>
                        <Text style={styles.detailValue}>{pet.sex}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>Porte:</Text>
                        <Text style={styles.detailValue}>{pet.size}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>Animal Castrado:</Text>
                        <Text style={styles.detailValue}>{pet.neutered ? 'Sim' : 'Não'}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>Local atual: </Text>
                        <Text style={styles.detailValue}>{pet.address.neighborhood}, {pet.address.city}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>Descrição:</Text>
                        <Text style={styles.detailValue}>{pet.about}</Text>
                    </View>

                    {pet.healthIssues && (
                        <View style={styles.detailContainer}>
                            <Text style={styles.detailTitle}>Problemas de saúde:</Text>
                            <Text style={styles.detailValue}>{pet.healthIssues.join(', ')} </Text>
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        {hasRequested ? (
                            <BlackButton text={'Remover solicitação'} onPress={handleRemoveAdoptionRequest} loading={loading} disabled={loading} style={styles.adoptButton}/>
                        ) : (
                            <BlackButton text={'Solicitar adoção'} onPress={handleAddAdoptionRequest} loading={loading} disabled={loading} style={styles.adoptButton}/>
                        )}

                        {(String(userId) === String(pet.donor)) ? (
                            <BlackButton text={'Editar pet'} onPress={goToEditPet} style={styles.editButton}/>
                        ) : null}
                    </View>

            </ScrollView> 

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    detailContainer: {
        backgroundColor: colors.blueMedium,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',  // Coloca o título e valor na mesma linha
        // justifyContent: 'space-between',  // Espaça o título e o valor
    },
    detailTitle: {
        fontSize: 24,
        color: colors.black,
        fontFamily: 'SchoolBell',
        textDecorationLine: 'underline',  
        alignSelf: 'center',// Aplica o sublinhado no título
    },
    detailValue: {
        fontSize: 20,
        color: colors.black,
        fontFamily: 'SchoolBell',
        alignSelf: 'center',
        marginLeft: 5
    },
    // detailContainer: {
    //     backgroundColor: colors.blueMedium,
    //     borderRadius: 10,
    //     paddingHorizontal: 5,
    //     marginVertical: 5,
    // },
    petDetail: {
        fontSize: 16,
        color: colors.textDark,
        fontFamily: 'SchoolBell',
        fontSize: 18,
        color: colors.black,
        marginVertical: 4,
    },
    // petImage: {
    //     width: 200,  
    //     height: 200,
    //     borderRadius: 15,
    //     marginBottom: 10
    // },
    petName: {
        fontFamily: 'SchoolBell',
        fontSize: 36,
        // fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        // marginBottom: 10,
        textDecorationLine: 'underline'
        // alignSelf: 'left'
    },
});