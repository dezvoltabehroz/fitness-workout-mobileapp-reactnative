import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, HorizontalList } from '../../components';
import { VerticalSpacer } from '../../lib/utils/global';
import styles from './style';

class PowerOfMind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: "Audio title",
                    rating: 1
                },
                {
                    title: "Audio title",
                    rating: 1
                },
                {
                    title: "Body Fitness",
                    rating: 1
                },
                {
                    title: "Body Warmups",
                    rating: 1
                }
            ],
            data1:  [{
                 title: "Body Fitness",
                rating: 1
            },
            {
                title: "Body Warmups",
                rating: 1
            }]
        }
    }

    _renderMenuItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => { }} style={styles.itemContainer} >
                <ImageBackground source={require('../../assets/images/you.png')} style={styles.contentContainer1}>
                    <View style={styles.opacity}>

                    </View>
                </ImageBackground>
                <View style={styles.textContainer}>
                    <Text style={styles.greyText}>{'5min'}</Text>
                    <Text style={styles.headingText}>{item.title}</Text>
                </View>

            </TouchableOpacity >
        )
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <ScrollView>

                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>Videos</Text>
                        </View>
                        <HorizontalList data={this.state.data1} video />
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>Audios</Text>
                        </View>
                        <FlatList
                            data={this.state.data.slice(0, 99)}
                            numColumns={2}
                            renderItem={this._renderMenuItem}
                            contentContainerStyle={styles.contentContainer}
                            keyExtractor={item => item.route}
                            ItemSeparatorComponent={VerticalSpacer}
                        />
                    </ScrollView>

                </View>
            </Container>

        )
    }
}

export default PowerOfMind;