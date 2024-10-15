import { Text, View, StyleSheet } from 'react-native';

export default function editPet() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TELA PARA EDITAR INFORMAÇÕES DE UM PET</Text>
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
