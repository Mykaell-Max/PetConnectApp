import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';

export default function chatsPreview() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>VAI TER UNS CHATS BOLADOS AQUI</Text>

      <Link href="/chat" style={commonStyles.button}>
        chat especifico
      </Link>
    </View>
  );
}