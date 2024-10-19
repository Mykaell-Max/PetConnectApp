import { Text, View, Button, Alert } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';
import { useAuth } from '../../../contexts/authContext';
import NotLogged from '../../../components/NotLogged';

export default function userProfile() {
  const { logout, isLoggedIn, userId} = useAuth();

  const handleLogout= async () => {
    try {
      logout();
      Alert.alert('Sucesso', 'Logout feito com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } 
  };

  if (!isLoggedIn) {
    return <NotLogged />;
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>AQUI VAI FICAR O PERFIL DO USUARIO, PRECISO CRIAR O FETCH</Text>

      <Link href="/editProfile" style={commonStyles.button}>
        edit profile
      </Link>
      
      <Button
        title='Logout'
        onPress={handleLogout}
      />

    </View>
  );
}
