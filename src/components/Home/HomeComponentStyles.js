import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors'

const HomeComponentStyles = StyleSheet.create({
  homeProductsContainer: {
    paddingHorizontal: 10,
    marginTop: 16
  },
  homeProductsHeadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7
  },
  homeProductCategory: {
    fontWeight: "bold",
    fontSize: 17
  },
  homeProductSeeAll:{
    color: Colors.RED,
    fontSize: 15
  }
});

export default HomeComponentStyles;
