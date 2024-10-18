import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Home = () => {
  return (
    <NavigationContainer>
      <Text>Hello Worlds!</Text>
    </NavigationContainer>
  );

};

export default Home;
