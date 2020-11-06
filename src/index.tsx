import React from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { NavigationContainer } from '@react-navigation/native'

import Feed from './screens/Feed'

enableScreens()
const Stack = createSharedElementStackNavigator()

const App: React.FC = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
          >
              <Stack.Screen name="Feed" component={Feed} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;