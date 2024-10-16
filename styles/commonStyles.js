import { StyleSheet } from 'react-native';
import colors from './Colors';

const commonStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.black,
      textAlign: 'center',
    },
    button: {
      fontSize: 20,
      textDecorationLine: 'underline',
      color: colors.black,
    },
});

export default commonStyles;