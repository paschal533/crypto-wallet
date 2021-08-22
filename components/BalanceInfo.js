import React from 'react';

import { View, Text, Image } from 'react-native';
import { SIZES, Icons, FONTS, COLORS, icons } from '../constants'; 

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
    return(
        <View style={{
            ...containerStyle
        }}>
            <Text style={{
                ...FONTS.h3, 
                color: COLORS.lightGray
            }}>{title}</Text>

            {/* Figures*/}
            <View style={{
                flexDirection: 'row',
                alignItems: "flex-end"
            }}>
                <Text style={{
                    ...FONTS.h3, 
                    color: COLORS.lightGray3
                }}>$</Text>
                <Text style={{
                    ...FONTS.h2, 
                    color: COLORS.white,
                    marginLeft: SIZES.base
                }}>{displayAmount.toLocalString()}</Text>
                <Text style={{
                    ...FONTS.h3, 
                    color: COLORS.lightGray3
                }}></Text>
            </View>

            {/* change Pec*/}
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
                {
                    changePct != 0 &&
                    <Image 
                        source={icons.upArrow}
                        style={{
                            width: 10,
                            height: 10,
                            alignSelf: 'center',
                            tintColor: (changePct > 0) ? COLORS.lightGreen
                            : COLORS.red,
                            transform: (changePct > 0) ? [{rotate: '45deg'}] : [{rotate: '125deg'}]
                        }}
                     />
                }
                <Text style={{
                    marginLeft: SIZES.base,
                    alignSelf: 'flex-end',
                    color: (changePct == 0) ? COLORS.lightGray :
                    (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                    ...FONTS.h4
                }}>
                    {changePct.toFixed(2)}%
                </Text>
                <Text style={{
                    marginLeft: SIZES.radius,
                    alignSelf: 'flex-end',
                    color: COLORS.lightGray3,
                    ...FONTS.h5
                }}> 7d change </Text>
            </View>
        </View>
    )
}

export default BalanceInfo;
