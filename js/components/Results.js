import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const detailText="Your BMI is in the ideal range: keep it up! A balanced diet and regular physical activity will continue to help you maintain your ideal weight.";


export default function Results(props) {

    function showInformation() {
        Alert.alert(
            'Infromation',
            'This calculator does not take bone density and muscle mass into account.',
        );
    }

    if (props.visible == false) {
        return (null);
    } else {
        return (

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.header}>Your BMI Result</Text>
                    </View>
                    <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 2 }} onPress={() => showInformation()}>
                        <Icon style={{ textAlign: 'center' }} name='information-outline' size={18} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.bmiValue}>{props.bmi}</Text>

                <Text style={[styles.resultStyle,{color: props.color}]}>{props.resultText}</Text>
                <Text style={styles.detailStyle}>{detailText}</Text>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    information: {
        textAlign: 'center',
        color: 'gray',
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
    },
    bmiValue: {
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 35
    },
    resultStyle: {
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 20
    },
    detailStyle: {
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 15
    }
})
