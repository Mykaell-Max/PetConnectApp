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
    fontFamily: 'SchoolBell',
    fontSize: 20
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
  linkText: {
    fontSize: 20,
    color: '#1E90FF',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'SchoolBell'
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default commonStyles;