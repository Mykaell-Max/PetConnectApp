import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PetCard from './PetCard';
import colors from '../styles/colors';

export default function PetList({ pets }) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PetCard pet={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  row: {
    justifyContent: 'space-between', 
  },
});
