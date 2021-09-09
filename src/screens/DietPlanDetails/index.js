import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Container, Icon } from '../../components';

import EarlyRise from '../../assets/svg/EarlyRise.svg'
import Breakfast from '../../assets/svg/Breakfast.svg'
import Lunch from '../../assets/svg/Lunch.svg'
import Snacks from '../../assets/svg/snacks.svg'
import Dinner from '../../assets/svg/Dinner.svg'
import Tick from '../../assets/svg/Tick-btn.svg'


import styles from './style';

export default class DietPlanDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false
        }
    }

    render() {
        return (
            <Container >
                <ScrollView contentContainerStyle={{ paddingBottom: '10%' }}>
                    <View style={styles.container}>
                    <View style={styles.cardContainer}>
                            <View style={styles.rowContainer}>
                                <EarlyRise />
                                <Text style={styles.headingText}>Early Rise</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle1}>1 cup tea or black coffee without sugar and milk lorem ipsum dolor set amit …</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>2 scrambled eggs lorem ipsum...</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>lorem ipsum dolor set amit…</Text>
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <View style={styles.rowContainer}>
                                <Breakfast />
                                <Text style={styles.headingText}>Breakfast</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle1}>1 cup tea or black coffee without sugar and milk lorem ipsum dolor set amit …</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>2 scrambled eggs lorem ipsum...</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>lorem ipsum dolor set amit…</Text>
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <View style={styles.rowContainer}>
                                <Lunch />
                                <Text style={styles.headingText}>Lunch</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle1}>1 cup tea or black coffee without sugar and milk lorem ipsum dolor set amit …</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>2 scrambled eggs lorem ipsum...</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>lorem ipsum dolor set amit…</Text>
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <View style={styles.rowContainer}>
                                <Snacks />
                                <Text style={styles.headingText}>Snacks</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle1}>1 cup tea or black coffee without sugar and milk lorem ipsum dolor set amit …</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>2 scrambled eggs lorem ipsum...</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>lorem ipsum dolor set amit…</Text>
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <View style={styles.rowContainer}>
                                <Dinner />
                                <Text style={styles.headingText}>Dinner</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle1}>1 cup tea or black coffee without sugar and milk lorem ipsum dolor set amit …</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>2 scrambled eggs lorem ipsum...</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Icon.Octicons name="primitive-dot" color={'#797B7B'} size={10} />
                                <Text style={styles.textStyle}>lorem ipsum dolor set amit…</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.setState({ finished: true })} style={{ position: "absolute", top: '85%', left: "78%" }}>
                    <Tick />
                </TouchableOpacity>
                <Modal isVisible={this.state.finished} style={{ marginTop: "5%", alignItems: "center" }}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => this.setState({ finished: false })} >
                            <Tick />
                        </TouchableOpacity>
                        <Text style={styles.headingText}>Finished!</Text>
                    </View>

                </Modal>
            </Container>

        )
    }
}