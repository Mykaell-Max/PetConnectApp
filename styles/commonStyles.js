import { StyleSheet } from 'react-native';
import colors from './colors';

const commonStyles = StyleSheet.create({
  viewSafe: {
    flex: 1,
    backgroundColor: colors.blueLight,
    padding: 10,
    paddingBottom: 0
  }, 
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // alignItems: 'center',
    // justifyContent: 'center',
    // fontFamily: 'SchoolBell',
  },
  text: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'SchoolBell'
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: colors.black,
    fontFamily: 'SchoolBell',
    marginBottom: 10
  },
  BigText: {
    fontFamily: 'SchoolBell',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 25,
    color: colors.black,
    textDecorationLine: 'underline'
},
});

export default commonStyles;