import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../store/market/marketActions';
import { icons, COLORS, SIZES, dummyData, FONTS } from '../constants';
import { useFocusEffect } from '@react-navigation/native'

import { MainLayout } from './';
//import { holdings } from '../constants/dummy';
import { BalanceInfo, IconTextButton, Chart } from '../components';

const Home = ({getCoinMarket, getHoldings, myHoldings, coins}) => {

    const [selectedCoin, setSelectedCoin] = React.useState(null)


    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
            getCoinMarket()
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)

    let valueChange = myHoldings.reduce((a, b) => a + (b.holdings_value_change_7d || 0), 0)
    let  percChange = valueChange / (totalWallet - valueChange) * 100

    function renderWalletInfoSection(){
        return(
            <View style={{
                paddingHorizontal: SIZES.padding,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: COLORS.gray
            }}>
                <BalanceInfo 
                    title="YOUR WALLET"
                    displayAmount={totalWallet}
                    changePct= {percChange}
                    containerStyle={{
                        marginTop: 50
                    }}
                />
                <View style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    marginBottom: -15,
                    paddingHorizontal: SIZES.radius
                }}>
                    <IconTextButton 
                        label='Transfer'
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius
                        }}
                        onPress={() => console.log('transfer')}
                    />
                      <IconTextButton 
                        label='Withdraw'
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius
                        }}
                        onPress={() => console.log('withdraw')}
                    />

                    {/* chart */}
                    <Chart 
                        containerStyle={{
                            marginTop: SIZES.padding * 2
                        }}
                        chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
                    />
                </View>
                {/* top cryptocurrency */}
                <FlatList 
                    data={coins}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View style={{ marginBottom: SIZES.radius}}>
                            <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>Top Cryptocurrency</Text>
                        </View>
                    }
                    renderItem={(item) => {
                        let priceColor = (item.price_change_percentage_7d_currency == 0) ? COLORS.lightGray3 :
                        (item.price_change_percentage_7d_currency > 0) ? COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity style={{
                                height: 55,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} onPress={() => setSelectedCoin(item)}>
                                {/* logo*/}
                                    <View style={{
                                        width: 35,
                                    }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{
                                                height: 20,
                                                width: 20,
                                            }}
                                         />
                                    </View>
                                {/* name */}
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <Text style={{
                                                color: COLORS.white,
                                                ...FONTS.h3
                                            }}>{item.name}</Text>
                                        </View>
                                {/*figure */}
                                <View>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.white,
                                        ...FONTS.h4
                                    }}>$ {item.current_price}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: "flex-end"
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
                                                }}
                                            />
                                        }
                                        <Text style={{
                                            marginLeft: 5,
                                            color: priceColor,
                                            ...FONTS.body5,
                                            lineHeight: 15
                                        }}>{item.price_change_percentage_7d_currency.t0Fixed(2)}%</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent={
                        <View style={{
                            marginBottom: 50
                        }} />
                    }
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
                {renderWalletInfoSection()}
             </View>
        </MainLayout>
    )
}

function mapStateToProps(state) {
    return { 
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
     }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, orderBy, 
            sparkline, priceChangePerc, perPage, page) => {
                return dispatch(getHoldings(holdings, currency, orderBy, 
                    sparkline, priceChangePerc, perPage, page))
            },
        getCoinMarket: (currency, orderBy, 
            sparkline, priceChangePerc, perPage, page) => {
                return dispatch(getCoinMarket(currency, orderBy, 
                    sparkline, priceChangePerc, perPage, page))
            }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

