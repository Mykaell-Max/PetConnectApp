import { Text, View, StyleSheet } from 'react-native';

export default function registerPet() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TELA PARA REGISTRAR UM PET</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
