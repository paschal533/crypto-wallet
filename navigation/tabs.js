import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { connect } from "react-redux";
import { setTradeModalVisibility } from "../store/tab/tabActions";

import { Home, Portfolio, Market, Profile } from "../screens"
import { TabIcon } from "../components";
import { COLORS, icons } from "../constants"
import { func } from "prop-types";

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({children, onPress}) => {
    return (
        <TouchableOpacity style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const Tabs = ({isTradeModalVisiblity, isTradeModalVisible}) => {
    function tradeTabButtonOnClickHandler() {
        setTradeModalVisibility(!isTradeModalVisible)
    }

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                            return(
                            <TabIcon 
                                focused={focused}
                                icon={icons.home}
                                label='home'
                            />
                        )}
                    }
                }}
                listener={{
                    tabPress: e => {
                        if(isTradeModalVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                        return(
                            <TabIcon 
                                focused={focused}
                                icon={icons.briefcase}
                                label='portfolio'
                            />
                        )}
                    }
                }}
                listener={{
                    tabPress: e => {
                        if(isTradeModalVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => {
                        return(
                            <TabIcon 
                                focused={focused}
                                icon={isTradeModalVisible ? icons.close : icons.trade}
                                iconStyle={isTradeModalVisible ? {
                                    width: 15,
                                    height: 15
                                } : null}
                                label='trade'
                                isTrade={true}
                            />
                        )
                    },
                    tabBarButton: (props) => {
                        <TabBarCustomButton {...props} onPress={() => tradeTabButtonOnClickHandler()} />
                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                        return(
                            <TabIcon 
                                focused={focused}
                                icon={icons.market}
                                label='market'
                            />
                        )}
                    }
                }}
                listener={{
                    tabPress: e => {
                        if(isTradeModalVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                        return(
                            <TabIcon 
                                focused={focused}
                                icon={icons.profile}
                                label='profile'
                            />
                        )}
                    }
                }}
                listener={{
                    tabPress: e => {
                        if(isTradeModalVisible){
                            e.preventDefault()
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

function mapStateToProps(state) {
    return { 
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTradeModalVisibility: (isVisible) => {return dispatch(setTradeModalVisibility(isVisible))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
