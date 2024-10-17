import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; 

export default function PetDetail() {
    const { petId } = useLocalSearchParams();
    

    return (
        <View>
            <Text>Olá {petId}</Text>
        </View>
    );
}
