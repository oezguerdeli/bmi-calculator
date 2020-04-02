import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var detailText = "";


export default function Results(props) {
    const [language, setLanguage] = useState('ENG');

    if(props.resultText=='Anorexia'){
        detailText="Take care of your health. Please see a doctor and pay attention to a healthy diet. ";
    }else if(props.resultText=='Underweight'){
        detailText="Underweight is just as unhealthy for the human body as overweight. Please see a doctor and pay attention to a healthy diet.";
    }else if(props.resultText=='Normal Weight'){
        detailText="Your BMI is in the ideal range: keep it up!";
    }else if(props.resultText=='Overweight'){
        detailText="If an overweight is calculated according to the BMI, this is by no means synonymous with unhealthy or not fit.";
    }else if(props.resultText=='Obesity'){
        detailText="In the case of obesity, a reduction in your body weight is necessary. We advise you to make an appointment with your doctor.";
    }else{
        detailText="";
    }


    /*
    useEffect(() => {
        let temp = _retrieveData();
        setLanguage(temp);
    });


    async function _storeData(language) {
        try {
            await AsyncStorage.setItem('language', language);
        } catch (error) {
            // Error saving data
        }
    };

    async function _retrieveData() {
        try {
            const value = await AsyncStorage.getItem('language');
            if (value !== null) { 
                // We have data!!
                return value;
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    */

    function showInformation() {
        Alert.alert(
            'Infromation',
            'This calculator does not take bone density and muscle mass into account.',
        );
    }

    if (props.visible == false) {
        return (
            <View style={styles.container}>
                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={{ textAlign: 'center' }}>Fill in the data and calculate your BMI.</Text>
                    </View>
                </View>
            </View>
        );

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

                <Text style={[styles.resultStyle, { color: props.color }]}>{props.resultText}</Text>
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
