import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { SIZES, FONTS, COLORS } from '../constants'; 

const HeaderBar = ({title}) => {
    return(
        <View style={{
            height: 100,
            paddingHorizontal: SIZES.radius,
            justifyContent: 'flex-end'
        }}>
            <Text style={{color: Colors.white, ...FONTS.largeTitle}}>{title}</Text>
        </View>
    )
}

export default HeaderBar;
