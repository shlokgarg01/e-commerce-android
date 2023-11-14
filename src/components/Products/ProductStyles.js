import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {deviceWidth} from '../../helpers/Dimensions';

const ProductStyles = StyleSheet.create({
  productCardContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 4,
    padding: 10,
    marginVertical: 4,
    width: deviceWidth / 2 - 20
  },
  productCardImage: {
    height: 160,
    width: deviceWidth / 2 - 40,
    borderRadius: 10,
  },
  productCardName: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 10,
  },
  productCardSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProductStyles;
