import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginOTP from './screens/Authentication/LoginOTP';
import Login from './screens/Authentication/Login';
import Home from './screens/Home/Home';
import SignupOTP from './screens/Authentication/SignupOTP';
import Splash from './screens/Splash';
import SignupOtpVerify from './screens/Authentication/SignupOtpVerify';
import Signup from './screens/Authentication/Signup';
import MyAccount from './screens/Account/MyAccount';
import Category from './screens/Category/Category';
import Cart from './screens/Cart/Cart';
import Colors from './utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfile from './screens/Account/EditProfile';
import MyOrders from './screens/Account/MyOrders';
import SavedAddresses from './screens/Account/SavedAddresses';
import HelpCenter from './screens/Account/HelpCenter';
import OrderDetails from './components/Account/OrderDetails';
import UpdateAddress from './screens/Account/UpdateAddress';
import NewAddress from './screens/Account/NewAddress';
import TrendingProducts from './screens/Home/TrendingProducts';
import FavouriteProducts from './screens/Home/FavouriteProducts';
import MostOrderedProduct from './screens/Home/MostOrderedProduct';
import ProductDetails from './screens/Home/ProductDetails';
import {useSelector} from 'react-redux';
import CategoryProducts from './screens/Category/CategoryProducts';
import SearchHeader from './components/SearchHeader';
import Checkout from './screens/Cart/Checkout';
import OrderConfirmation from './screens/Cart/OrderConfirmation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      // Check if the Home tab is pressed
      if (e.target.split('-')[0] === 'hometab') {
        // Reset the stack to the first screen (Product)
        navigation.navigate('tabnav', {
          screen: 'hometab',
          params: {screen: 'home'},
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {display: 'none'}}}>
      <Tab.Screen
        name="home"
        component={Home}
        options={() => headerOptions('Home')}
      />
      <Tab.Screen
        name="trendingproducts"
        component={TrendingProducts}
        options={() => headerOptions('Trending Products')}
      />
      <Tab.Screen
        name="favouriteproducts"
        component={FavouriteProducts}
        options={() => headerOptions('Favourite Products')}
      />
      <Tab.Screen
        name="mostorderedproducts"
        component={MostOrderedProduct}
        options={() => headerOptions('Most Ordered Products')}
      />
      <Tab.Screen
        name="productdetails"
        component={ProductDetails}
        options={() => headerOptions('Product Details')}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('home');
          },
        })}
      />
    </Tab.Navigator>
  );
};

const CategoryTabScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if (e.target.split('-')[0] === 'categorytab') {
        // Reset the stack to the first screen (Product)
        navigation.navigate('tabnav', {
          screen: 'categorytab',
          params: {screen: 'category'},
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {display: 'none'}}}>
      <Tab.Screen
        name="category"
        component={Category}
        options={() => headerOptions('Categories')}
      />
      <Tab.Screen
        name="categoryproducts"
        component={CategoryProducts}
        options={() => headerOptions('Products')}
      />
    </Tab.Navigator>
  );
};

const CartTabScreen = () => (
  <Tab.Navigator screenOptions={{tabBarStyle: {display: 'none'}}}>
    <Tab.Screen
      name="cart"
      component={Cart}
      options={() => headerOptions('My Cart')}
    />
    <Tab.Screen
      name="checkout"
      component={Checkout}
      options={() => headerOptions('Checkout')}
    />
    <Tab.Screen
      name="confirmorder"
      component={OrderConfirmation}
      options={() => headerOptions('Confirm Order')}
    />
  </Tab.Navigator>
);

// My Account Tab
const AccountTabScreen = () => (
  <Tab.Navigator screenOptions={{tabBarStyle: {display: 'none'}}}>
    <Tab.Screen
      name="account"
      component={MyAccount}
      options={() => headerOptions('My Account')}
    />
    <Tab.Screen
      name="editprofile"
      component={EditProfile}
      options={() => headerOptions('Edit Profile')}
    />
    <Tab.Screen
      name="myorders"
      component={MyOrders}
      options={() => headerOptions('My Orders')}
    />
    <Tab.Screen
      name="orderdetails"
      component={OrderDetails}
      options={() => headerOptions('Order Details')}
    />
    <Tab.Screen
      name="savedaddresses"
      component={SavedAddresses}
      options={() => headerOptions('Saved Addresses')}
    />
    <Tab.Screen
      name="helpcenter"
      component={HelpCenter}
      options={() => headerOptions('Help Center')}
    />
    <Tab.Screen
      name="updateaddress"
      component={UpdateAddress}
      options={() => headerOptions('Update Address')}
    />
    <Tab.Screen
      name="newaddress"
      component={NewAddress}
      options={() => headerOptions('New Address')}
    />
  </Tab.Navigator>
);

const headerOptions = title => ({
  title,
  headerStyle: {backgroundColor: Colors.PRIMARY},
  headerTitleStyle: {color: Colors.WHITE},
  headerTitleAlign: 'center',
  tabBar: () => (
    <View>
      <Text>jksdcnncmsdlkcmsklm</Text>
    </View>
  ),
  header:
    title === 'Categories' || title === 'Home' || title === 'Products'
      ? () => <SearchHeader />
      : undefined,
});

const TabBarOptions = (title, iconName, parentRouteName, badge = 0) => ({
  title,
  tabBarLabelStyle: {fontSize: 13},
  tabBarBadge: title === 'Cart' ? badge : undefined,
  tabBar: () => (
    <View>
      <Text>jksdcnncmsdlkcmsklm</Text>
    </View>
  ),
  tabBarOnPress: ({navigation, defaultHandler}) => {
    // Check if the "Home" tab is already active and the current screen is a nested screen
    if (navigation.state.index > 0) {
      // Navigate to the "Product" screen (first screen in the "Home" tab stack)
      navigation.navigate(parentRouteName);
    } else {
      // Otherwise, proceed with the default behavior (switching tabs)
      defaultHandler();
    }
  },
  tabBarIcon: ({focused}) => (
    <Icon
      name={iconName}
      color={focused ? Colors.PRIMARY : Colors.GRAY}
      size={25}
    />
  ),
});

// Main Tab Navigator
const TabNav = ({badge}) => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY,
      tabBarInactiveTintColor: Colors.GRAY,
    }}>
    <Tab.Screen
      name="hometab"
      component={HomeTabScreen}
      options={() => TabBarOptions('Home', 'home', 'home')}
    />
    <Tab.Screen
      name="categorytab"
      component={CategoryTabScreen}
      options={() => TabBarOptions('Category', 'apps', 'category')}
    />
    <Tab.Screen
      name="carttab"
      component={CartTabScreen}
      options={() => TabBarOptions('Cart', 'cart-outline', 'cart', badge)}
    />
    <Tab.Screen
      name="accounttab"
      component={AccountTabScreen}
      options={() =>
        TabBarOptions('Account', 'account-circle-outline', 'account')
      }
    />
  </Tab.Navigator>
);

function Routes() {
  const {cartItems} = useSelector(state => state.cart);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={Splash} />

        <Stack.Screen name="tabnav">
          {props => <TabNav {...props} badge={cartItems?.length || 0} />}
        </Stack.Screen>

        <Stack.Screen name="loginotp" component={LoginOTP} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signupotp" component={SignupOTP} />
        <Stack.Screen name="signupotpverify" component={SignupOtpVerify} />
        <Stack.Screen name="signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
