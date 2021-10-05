import React, { Component } from "react";
import { Text, View } from 'react-native';
import { connect } from "react-redux";
import { Container, Button } from "../../components";
import { route } from "../../lib/utils/constants";
import styles from './style';

class WorkoutSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>

                <View style={styles.container}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.textStyle}>Fitness Goal: </Text>
                        <Text style={styles.textStyle1}>{this.props.user.userData.fitness_goal}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.textStyle}>Fitness Level: </Text>
                        <Text style={styles.textStyle1}>{this.props.user.userData.fitness_level}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.textStyle}>Equipment Types: </Text>
                        <Text style={styles.textStyle1}>{this.props.user.userData.fitness_equipment}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.textStyle}>Focus Area: </Text>
                        <Text style={styles.textStyle1}>{this.props.user.userData.tags}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title={"Change Workout Settings"} onPress={() => this.props.navigation.navigate(route.FITNESSGOAL)} />
                    </View>
                </View>

            </Container>
        )
    }
}

const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(WorkoutSettings);
