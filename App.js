import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();

const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Start'
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
