import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../styles/commonStyles';

export default function homeScreen() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>AQUI É A PAGINA PRINCIPAL DO APLICATIVO, OS ANIMAL VAI FICAR LISTADO AQUI</Text>

      <Link href="/(auth)/register" style={commonStyles.button}>
        register screen
      </Link>

      <Link href="/(auth)/login" style={commonStyles.button}>
        login screen
      </Link>

      <Link href="/(pets)/petDetail" style={commonStyles.button}>
        pet screen
      </Link>

    </View>
  );
}