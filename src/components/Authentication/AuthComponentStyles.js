import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {deviceHeight, deviceWidth} from '../../helpers/Dimensions'

const AuthComponentStyles = StyleSheet.create({
  bgContainer: {
    height: deviceHeight * 0.43,
    backgroundColor: Colors.PRIMARY,
    width: deviceWidth,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20,
    alignItems: 'center',
  },
  logo: {
    height: 130,
    width: 130,
    borderRadius: 500,
  },
  companyName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginVertical: 16,
  },
  btnSubTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },
  btnSubTextTitle: {fontSize: 15},
  btnSubTextSubTitle: {color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 15},
});

export default AuthComponentStyles;
