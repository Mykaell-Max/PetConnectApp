import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 
import { fetchSinglePet } from '../../../services/petService';
import colors from '../../../styles/colors';
import commonsStyles from '../../../styles/commonStyles';
import PetCarousel from '../../../components/petCarousel';

export default function PetDetail() {
    const { petId } = useLocalSearchParams();

    const [pet, setPet] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const loadPet = async (petId) => {
            try {
                const data = await fetchSinglePet(petId);
                setPet(data); 
            } catch (error) {
                setError('Erro ao buscar pet.')
            } finally {
                setLoading(false);
            }
        }

        loadPet(petId);
    }, []);

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
        <ScrollView style={styles.container}  nestedScrollEnabled={true}>
            <PetCarousel petImages={pet.pictures} />
            <View style={styles.detailsContainer}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petDetail}>Idade: {pet.age}</Text>
                <Text style={styles.petDetail}>Espécie: {pet.petSpecie}</Text>
                <Text style={styles.petDetail}>Tamanho: {pet.size}</Text>
                <Text style={styles.petDetail}>Sexo: {pet.sex}</Text>
                <Text style={styles.petAbout}>Sobre: {pet.about}</Text>
                <Text style={styles.petAbout}>Local atual: {pet.address.neighborhood}, {pet.address.city} </Text>
                {pet.healthIssues && (
                    <Text style={styles.healthIssues}>
                        Problemas de Saúde: {pet.healthIssues.join(', ')}
                    </Text>
                )}
            </View>
        </ScrollView> 
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
    petAbout: {
        fontSize: 16,
        fontFamily: 'SchoolBell',
        color: colors.textLight,
        marginTop: 10,
        marginBottom: 10,
    },
    healthIssues: {
        fontSize: 18,
        fontFamily: 'SchoolBell',
        color: colors.red,
        marginTop: 10,
    },
});
