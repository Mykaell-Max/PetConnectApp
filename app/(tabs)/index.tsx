import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function homeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AQUI É A PAGINA PRINCIPAL DO APLICATIVO, OS ANIMAL VAI FICAR LISTADO AQUI</Text>

      <Link href="/(auth)/register" style={styles.button}>
        register screen
      </Link>

      <Link href="/(auth)/login" style={styles.button}>
        login screen
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
      textAlign: 'center'
    },
    button: {
      fontSize: 20,
      textDecorationLine: 'underline',
      color: '#fff',
    },
  });