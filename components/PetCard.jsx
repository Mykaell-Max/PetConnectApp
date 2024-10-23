import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

export default function PetCard({ pet }) {
    const navigation = useNavigation();

    const goToPetDetails = () => {
        navigation.navigate('petDetail', { petId: pet.id });  
    };

    return (
        <TouchableOpacity onPress={goToPetDetails} style={styles.cardContainer}>
                <Image source={{ uri: pet.picture }} style={styles.image} />
                <Text style={styles.petName}>{pet.name}, {pet.age}</Text>
                <Text style={styles.text}>{pet.address}</Text>            
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '48%', 
        height: 200, 
        marginBottom: 8, 
        borderRadius: 8,        
        backgroundColor: colors.blueMedium, 
        elevation: 2,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: 2,
        borderWidth: 0.5,
        borderColor: colors.black,
    },
    image: {
        width: '100%', 
        height: '80%',
        borderRadius: 8,
    },
    text: {
        fontFamily: 'SchoolBell',
        textAlign: 'left',
        fontSize: 13,
        color: colors.black,
        overflow: 'visible'
    },
    petName: {
        fontFamily: 'SchoolBell',
        textAlign: 'left',
        fontSize: 14,
        color: colors.black,
    }
});