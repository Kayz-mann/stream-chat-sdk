import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import 'react-native-gesture-handler';


import LoginScreen from './src/Screens/Login';
// import ChatScreen from './src/Screens/ChatScreen';
import { ChatRoom } from './src/Screens/ChatRoom';


const Stack = createNativeStackNavigator();


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Chat'>
        {/* <Stack.Screen name='Login' component={LoginScreen} /> */}
        {/* <Stack.Screen name='Chat' component={ChatScreen} /> */}
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          // options={({route}) => ({title: route.params})}
        />
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
