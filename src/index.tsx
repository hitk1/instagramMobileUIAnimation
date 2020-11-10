import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { NavigationContainer } from '@react-navigation/native'

import Feed from './screens/Feed'
import FeedTwo from './screens/FeedTwo'
import Comments from './screens/Comments'

enableScreens()
const Stack = createSharedElementStackNavigator() 

const App: React.FC = () => {
  return (
      <NavigationContainer>
          <StatusBar backgroundColor="#1D1E1E"/>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="FeedTwo" component={FeedTwo} />
              <Stack.Screen name="Comments" component={Comments} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;