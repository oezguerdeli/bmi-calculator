import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import i18n from './i18n';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var detailText = "";


export default function Results(props) {
    const [language, setLanguage] = useState('ENG');

    if (props.resultTextProp == i18n.t('anorexia')) {
        detailText = i18n.t('text1');
    } else if (props.resultTextProp == i18n.t('underWeight')) {
        detailText = i18n.t('text2');
    } else if (props.resultTextProp == i18n.t('normalWeight')) {
        detailText = i18n.t('text3');
    } else if (props.resultTextProp == i18n.t('overWeight')) {
        detailText = i18n.t('text4');
    } else if (props.resultTextProp == i18n.t('obesity')) {
        detailText = i18n.t('text5');
    } else {
        detailText = "";
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
            'Information',
            detailText,
        );
    }

    if (props.visible == false) {
        return (
            <View style={styles.container}>
                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={{ textAlign: 'center' }}>{i18n.t('attention')}</Text>
                    </View>
                </View>
            </View>
        );

    } else {
        return (

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.header}>{i18n.t('resultHeader')}</Text>
                    </View>
                    <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 2 }} onPress={() => showInformation()}>
                        <Icon style={{ textAlign: 'center' }} name='information-outline' size={18} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.bmiValue}>{props.bmi}</Text>

                <Text style={[styles.resultStyle, { color: props.color }]}>{props.resultTextProp}</Text>
                {
                    /*
                    <Text style={styles.detailStyle}>{detailText}</Text>
                    */
                }
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
