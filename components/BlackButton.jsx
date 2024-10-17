import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';

export default function BlackButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.black, // Cor de fundo preta
    borderRadius: 50, // Para torná-lo redondo
    paddingVertical: 12, // Altura do botão
    paddingHorizontal: 20, // Margem horizontal em relação ao texto
    alignItems: 'center', // Centraliza o texto
    justifyContent: 'center', // Centraliza o texto
    alignSelf: 'center', // Faz com que o botão ocupe apenas o espaço do texto
    elevation: 20,
    shadowColor: colors.black, 
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: colors.yellow, // Cor do texto amarela
    fontFamily: 'SchoolBell', // Usando a fonte SchoolBell
    fontSize: 18, // Tamanho da fonte (ajuste conforme necessário)
  },
});
