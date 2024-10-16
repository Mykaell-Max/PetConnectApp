import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';

export default function petDetail() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>TELA PARA EXIBIÇÃO MAIS DETALHADA DE UM PET</Text>

      <Link href="/editPet" style={commonStyles.button}>
        edit pet
      </Link>

      <Link href="/registerPet" style={commonStyles.button}>
        add pet
      </Link>

    </View>
  );
}