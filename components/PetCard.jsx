import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PetCard({ pet }) {
  return (
    <View style={styles.cardContainer}>
        <Image source={{ uri: pet.pictures[0] }} style={styles.image} />
        <Text style={styles.name}>{pet.name}</Text>
        <Text>{pet.age}</Text>
        <Text>{pet.address.neighborhood}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '48%', 
        height: 200, 
        marginBottom: 16, 
        borderRadius: 8,       
        overflow: 'hidden', 
        backgroundColor: '#fff', 
        elevation: 1,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%', 
        height: '70%',
    },
    petName: {
        textAlign: 'center', 
        fontWeight: 'bold', 
        marginVertical: 8, 
    },
});