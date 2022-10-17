import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Home, Matches, UserProfile } from '../../containers';
import Colors from '../colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from '../../containers/Chat';
const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={Colors.Primary}
            inactiveColor='#A5A5A5'
            barStyle={{ backgroundColor: Colors.White }}
            shifting={false}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="search" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen name="Matches" component={Matches}
                options={{
                    tabBarLabel: 'Matches',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="heart-outline" color={color} size={24} />
                    ),
                }}

            />

            <Tab.Screen name="Chat" component={Chat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbubble-ellipses-outline" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={UserProfile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-outline" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs