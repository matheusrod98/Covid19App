import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons, Entypo} from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import FeedScreen from './screens/FeedScreen';
import StatsScreen from './screens/StatsScreen';
import CommentScreen from './screens/CommentScreen';
import PostingScreen from './screens/PostingScreen';

const Stack = createStackNavigator ();
const Tab = createBottomTabNavigator ();

function LoggedInFlow () {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "mainFeed" component = {TabFlow} options = {{headerShown: false}} />
            <Stack.Screen name = "comment" component = {CommentScreen} />
            <Stack.Screen 
                name = "posting" 
                component = {PostingScreen} 
                options = {{
                    headerTitleAlign: "center",
                    title: "Criar Publicação",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    }
                }}
            />
        </Stack.Navigator>
    )
}

function TabFlow () {
    
    return (
        <Tab.Navigator tabBarOptions = {{
            labelStyle: {fontSize: 16},
            activeTintColor: '#75ffaf' }}>
       
            <Tab.Screen 
                name = 'Feed' 
                component = {FeedScreen} 
                options = {{tabBarIcon: ({focused}) => <MaterialCommunityIcons name = 'clipboard-text-outline' size = {27} color = {focused ? '#75ffaf' : 'gray'} />}} />

            <Tab.Screen 
                name = 'Stats' 
                component = {StatsScreen} 
                options = {{tabBarIcon: ({focused}) => <Entypo name = 'line-graph' size = {27} color = {focused ? '#75ffaf' : 'gray'} /> }} />
        
        </Tab.Navigator>
    )
}

export default function () {
    const [hasToken, setHasToken] = useState (null);
    const [loadingToken, setLoadingToken] = useState (true);

    async function tryLocalLogin () {
        try {
            const asyncUser = await AsyncStorage.getItem ('user');
            asyncUser === null ? setHasToken (false) : setHasToken (true);
        }

        catch (error) {
            console.log (error);
            setHasToken (false);
        }

        finally {
        setLoadingToken (false);
        }
    }

    useEffect (() => { 
        tryLocalLogin ();
    }, [] );

    if (loadingToken === true) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode = 'none' initialRouteName = {hasToken === true ? 'Logged' : 'Login'} >
                <Stack.Screen name = 'Login' component = {LoginScreen} />
                <Stack.Screen name = 'Logged' component = {LoggedInFlow} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
