import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import colors from '../styles/colors';

export default function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
        <ActivityIndicator size="large" color={colors.yellow} /> 
      </View>
    );
}