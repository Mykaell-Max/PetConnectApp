import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function chatsPreview() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VAI TER UNS CHATS BOLADOS AQUI</Text>

      <Link href="/chat" style={styles.button}>
        chat especifico
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
