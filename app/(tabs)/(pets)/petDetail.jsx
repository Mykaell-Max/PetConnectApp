import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function petDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TELA PARA EXIBIÇÃO MAIS DETALHADA DE UM PET</Text>

      <Link href="/editPet" style={styles.button}>
        edit pet
      </Link>

      <Link href="/registerPet" style={styles.button}>
        add pet
      </Link>

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
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
