import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './(auth)/sign-up';
import 'react-native-reanimated';

const Stack = createNativeStackNavigator();

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('details')}
        />
      </View>
  );
}

export default function RootLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='index'>
        <Stack.Screen name="index" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
        <Stack.Screen name="sign-up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
