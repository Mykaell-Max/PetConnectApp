import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';


export default function userProfile() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>VAI TER UM PERFIL LINDO AQUI</Text>

      <Link href="/editProfile" style={commonStyles.button}>
        edit profile
      </Link>
    </View>
  );
}
