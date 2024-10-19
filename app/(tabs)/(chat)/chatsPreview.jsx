import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';
import NotLogged from '../../../components/NotLogged';
import { useAuth } from '../../../contexts/authContext';

export default function chatsPreview() {
  const { logout, isLoggedIn, userId} = useAuth();

  if (!isLoggedIn) {
    return <NotLogged />;
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>VAI TER UNS CHATS BOLADOS AQUI</Text>

      <Link href="/chat" style={commonStyles.button}>
        chat especifico
      </Link>
    </View>
  );
}