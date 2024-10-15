import { Text, View, StyleSheet } from 'react-native';

export default function chatsPreview() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VAI TER UNS CHATS BOLADOS AQUI</Text>
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
