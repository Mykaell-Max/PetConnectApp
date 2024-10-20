import { Text, View, Image, Button, Alert, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import commonStyles from '../../../styles/commonStyles';
import { useAuth } from '../../../contexts/authContext';
import NotLogged from '../../../components/NotLogged';
import BlackButton from '../../../components/BlackButton';
import { fetchSingleUser } from '../../../services/userService';
import React, { useEffect, useState } from 'react';
import colors from '../../../styles/colors';

export default function userProfile() {
  const { logout, isLoggedIn, userId} = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async (userId) => {
        try {
            const data = await fetchSingleUser(userId);
            setUser(data);
            // console.log(data);
        } catch (error) {
            setError('Erro ao carregar informações de usuário!');
        } finally {
            setLoading(false);
        }
    };

    loadUser(userId);
  }, [userId]);

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.yellow} />
        </View>
    );
  }

  const handleLogout = async () => {
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

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView >
      <View style={styles.profilePictureContainer}>
        <Image
          source={
            user.profilePicture
              ? { uri: user.profilePicture } 
              : require('../../../assets/images/default-profile.png') 
          }
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.headerText}>Perfil de Usuário</Text>
        
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.infoText}>{user.name} {user.lastName}</Text>

        <Text style={styles.label}>Sobre:</Text>
        <Text style={styles.infoText}>{user.description}</Text>

        <Text style={styles.label}>Redes sociais:</Text>
        <Text style={styles.infoText}>{user.socialMedias}</Text>

        {user.address && (
          <>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.infoText}>{user.address.neighborhood}, {user.address.city}</Text>
          </>
        )}

        <Text style={styles.label}>Data de Criação:</Text>
        <Text style={styles.infoText}>{new Date(user.createdAt).toLocaleDateString()}</Text>
      </View>

      <Link href="/registeredPets" style={commonStyles.button}>
        Pets registrados
      </Link>

      <Link href="/adoptionRequests" style={commonStyles.button}>
        Solicitações de adoção
      </Link>

      <Link href="/editProfile" style={commonStyles.button}>
        Editar Perfil
      </Link>

      <BlackButton
        text='Logout'
        onPress={handleLogout}
      />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  errorText: {
    color: colors.red,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    padding: 14,
    backgroundColor: colors.lightBackground,
    flex: 1,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.black,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginTop: 10,
  },
  infoText: {
    fontSize: 18,
    color: colors.black,
    marginBottom: 5,
  },
});
