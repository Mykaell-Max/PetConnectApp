import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';


export default function userProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VAI TER UM PERFIL LINDO AQUI</Text>

      <Link href="/editProfile" style={styles.button}>
        edit profile
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
