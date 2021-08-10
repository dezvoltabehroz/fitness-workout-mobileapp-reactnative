
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { initStripe, useStripe, CardField } from '@stripe/stripe-react-native';

import { Button, ColorButton, Container } from '../../components';
import { SCREEN_WIDTH } from '../../lib/utils/constants';

import styles from './style';

export default class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={{ flex: 0.4, alignItems: "center" }}>
                        <Image resizeMode={"contain"} source={require('../../assets/images/download.jpg')} style={{ justifyContent: "center", height: 200, width: SCREEN_WIDTH * 0.8 }} />
                    </View>
                    <View style={{ marginTop: "10%" }}>
                        <CardField
                            postalCodeEnabled={false}
                            placeholder={{
                                number: '4242 4242 4242 4242',
                            }}
                            cardStyle={{
                                backgroundColor: '#FFFFFF',
                                textColor: '#000000',
                            }}
                            style={{
                                width: '100%',
                                height: 50,
                                marginVertical: 30,
                            }}
                            onCardChange={(e) => {
                                console.log('cardDetails', e);
                                setDetails(e)
                            }}
                            onFocus={(focusedField) => {
                                console.log('focusField', focusedField);
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.5, justifyContent: "flex-end", marginHorizontal: "10%" }}>
                        {
                            this.props.route.params ?
                                <Button title={'PAY NOW'} />
                                :
                                <ColorButton title={'CANCEL SUBSCRIPTION'} />
                        }

                    </View>
                </View>
            </Container>
        )
    }
}