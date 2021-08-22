import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { getHoldings } from '../store/market/marketActions';
import { icons, COLORS, SIZES, dummyData, FONTS } from '../constants';
import { useFocusEffect } from '@react-navigation/native';
import { BalanceInfo, Chart } from '../components';

import { MainLayout } from '.';
const Portfolio = ({getHoldings, myHoldings}) => {
    const [selectedCoin, setSelectedCoin] = React.useState(null)


    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)

    let valueChange = myHoldings.reduce((a, b) => a + (b.holdings_value_change_7d || 0), 0)
    let  percChange = valueChange / (totalWallet - valueChange) * 100

    function renderCurrentBalanceSection() {
        return(
            <View style={{
                paddingHorizontal: SIZES.padding,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: COLORS.gray
            }}>
                <Text style={{
                    marginTop: 50,
                    color: COLORS.white,
                    ...FONTS.largeTitle
                }}>Portfolio</Text>

                <BalanceInfo 
                    title="Current Balance"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.padding
                    }}
                />
            </View>
        )
    }
    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}>
                {/* header */}
                {renderCurrentBalanceSection()}
                {/* chart */}
                <Chart 
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.value : myHoldings[0]?.sparkline_in_7d?.value}
                />
                {/* assets */}
                <FlatList 
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View>
                            {/* section label */}
                            <Text style={{
                                ...FONTS.h2, color: COLORS.white
                            }}>Your Assets</Text>
                            {/* header label */}
                            <View style={{
                                flexDirection: 'row',
                                marginTop: SIZES.radius,
                            }}>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3
                                }}>Asset</Text>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3,
                                    textAlign: 'right'
                                }}>Price</Text>
                                <Text style={{
                                     flex: 1,
                                     color: COLORS.lightGray3,
                                     textAlign: 'right'
                                }}>Holdings</Text>
                            </View>
                        </View>
                    }
                    renderItem={({item}) => {
                        let priceColor = (item.price_change_percentage_7d_currency == 0) ? COLORS.lightGray3 :
                        (item.price_change_percentage_7d_currency > 0) ? COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                height: 55
                            }} onPress={() => setSelectedCoin(item)}>
                                {/* Asset */}
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image 
                                        source={{uri: item.image}}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    <Text style={{
                                        marginLeft: SIZES.radius, color: COLORS.white, ...FONTS.h4
                                    }}>{item.name}</Text>
                                </View>
                                {/* prices */}
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            textAlign: 'right',
                                            color: COLORS.white,
                                            ...FONTS.h4, lineHeight: 15
                                        }}>$ {item.currency_price.toLocaleString()}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end'
                                        }}>
                                             {
                                            item.
                                            price_change_percentage_7d_currency != 0 &&
                                            <Image 
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    tintColor: priceColor,
                                                    transform: item.price_change_percentage_7d_currency > 0 ?
                                                    [{rotate: '45deg'}] : [{rotate: '125deg'}]
                                                }} />
                                         }
                                          <Text style={{
                                            marginLeft: 5,
                                            color: priceColor,
                                            ...FONTS.body5,
                                            lineHeight: 15
                                        }}>{item.price_change_percentage_7d_currency.t0Fixed(2)}%</Text>
                                        </View>
                                    </View>
                                {/* Holdings */}
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.white,
                                        lineHeight: 15,
                                        ...FONTS.h4
                                    }}>
                                        $ {item.total.toLocaleString()}
                                    </Text>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.lightGray3,
                                        ...FONTS.body5,
                                        lineHeight: 15
                                    }}>
                                        {item.qty} {item.symbol.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
             </View>
        </MainLayout>
    )
}

function mapStateToProps(state) {
    return { 
        myHoldings: state.marketReducer.myHoldings,
      }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, orderBy, 
            sparkline, priceChangePerc, perPage, page) => {
                return dispatch(getHoldings(holdings, currency, orderBy, 
                    sparkline, priceChangePerc, perPage, page))
            }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);


