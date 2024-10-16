import { Text, View } from 'react-native';
import commonStyles from '../../../styles/commonStyles';

export default function editPet() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>TELA PARA EDITAR INFORMAÇÕES DE UM PET</Text>
    </View>
  );
}