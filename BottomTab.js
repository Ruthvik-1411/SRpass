/*
Created by Ruthvik on 10/06/2023
Part of a code for SRpass app in react native
*/
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SaveScreen from './SaveScreen';
import QueryScreen from './QueryScreen';
import EditScreen from './EditScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Save') {
            iconName = focused ? 'database-plus' : 'database-plus-outline';
          }
          else if (route.name === 'Search') {
            iconName = focused ? 'database-search' : 'database-search-outline';
          }
          else if (route.name === 'Update') {
            iconName = focused ? 'database-edit' : 'database-edit-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Save" component={SaveScreen} options={{headerShown: false}} />
      <Tab.Screen name="Search" component={QueryScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Update" component={EditScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default BottomTab;
