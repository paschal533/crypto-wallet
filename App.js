import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import { createStore, applyMiddeware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from './store/rootReducer';

import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();

const store = createStore(
    rootReducer,
    applyMiddeware(thunk)
)

const App = () => {
    return (
        <Provider store={store}> 
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'MainLayout'}
                >
                    <Stack.Screen
                        name="MainLayout"
                        component={Tabs}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;
