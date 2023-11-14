import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

const AccountStyles = StyleSheet.create({
  userName: {
    color: Colors.BLACK,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
  },
  profileContainer: {
    backgroundColor: Colors.WHITE,
    elevation: 10,
    padding: 20,
    marginTop: 10,
  },
  noSavedInfo: {
    textAlign: 'center',
    fontSize: 19,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default AccountStyles;
