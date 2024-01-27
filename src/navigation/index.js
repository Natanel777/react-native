// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from '../components/StartPage';
import StartPageGoals from '../components/StartPageGoals';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='StartPage'>
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="StartPageGoals" component={StartPageGoals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;