import { Text, View, StyleSheet } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LOGIN AQUI</Text>
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
