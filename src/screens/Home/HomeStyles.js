import {StyleSheet} from 'react-native';
import {deviceHeight} from '../../helpers/Dimensions';
import Colors from '../../utils/Colors';

const HomeStyles = StyleSheet.create({
  productDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productDetailsSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productDetailsImage: {
    height: deviceHeight * 0.5,
  },
  productDetailsHeading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  productDetailsmutedText: {
    color: Colors.GRAY,
    marginRight: 10,
    fontSize: 15,
  },
  productDetailsSubHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  productDetailsDescription:{
    textAlign: 'justify',
    marginBottom: 16
  }
});

export default HomeStyles;
