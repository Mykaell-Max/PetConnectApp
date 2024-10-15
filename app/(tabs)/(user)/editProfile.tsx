import { Text, View, StyleSheet } from 'react-native';

export default function editProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VAI COMO EDITAR A PORRA DO PERFIL AQUI</Text>
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
