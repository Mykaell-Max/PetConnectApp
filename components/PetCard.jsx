import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
        marginBottom: 16, 
        borderRadius: 8,       
        overflow: 'hidden', 
        backgroundColor: colors.yellow, 
        elevation: 2,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: 2
    },
    image: {
        width: '100%', 
        height: '80%',
        borderRadius: 8
    },
    text: {
        // fontFamily: 'SchoolBell',
        // marginLeft: 5,
        textAlign: 'left',
        fontSize: 12,
        color: colors.black,
    },
    petName: {
        // marginLeft: 5,
        fontFamily: 'SchoolBell',
        textAlign: 'left',
        fontSize: 14,
        color: colors.black,
    }
});