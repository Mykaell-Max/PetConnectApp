import { Text, View } from 'react-native';
import commonStyles from '../../../styles/commonStyles';

export default function registerPet() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>TELA PARA REGISTRAR UM PET</Text>
    </View>
  );
}