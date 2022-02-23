import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/Screens/Login';
import ChatScreen from './src/Screens/ChatScreen';


const Stack = createNativeStackNavigator();


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
