import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import PetCard from './PetCard';

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
  },
  row: { 
    justifyContent: 'space-around',
  },
});
