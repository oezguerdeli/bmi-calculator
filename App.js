import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Dimensions, TouchableOpacity, Alert, Modal, Switch, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob';

import Results from './js/components/Results';
import i18n from './js/components/i18n';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let resultColor1, resultText1;

export default function App() {
  const [language, setLanguage] = useState('ENG');
  const [weight, setWeight] = useState(0.);
  const [height, setHeight] = useState(0.);
  const [age, setAge] = useState(0);
  const [bmi, setBmi] = useState(0.);
  const [gender, setGender] = useState('');
  const [colorMale, setColorMale] = useState('lightgray');
  const [colorFemale, setColorFemale] = useState('lightgray');
  const [visibleResults, setVisibleResults] = useState(false);
  const [resultTextColor, setResultTextColor] = useState('');
  const [resultText, setResultText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  function bannerError() {
    console.log("An error");
    return;
  }

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    SaveNewLanguage();
  }

  function SaveNewLanguage() {
    if (isEnabled) {
      i18n.locale = 'de';
      _storeData('DE');
    } else {
      _storeData('ENG');
      i18n.locale = 'en';
    }
  }

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

  useEffect(async () => {    
    let temp = await _retrieveData();
    if(temp=='de' || temp=='en'){
      i18n.locale = temp;
    }
    
  },[]);


  /*
    useEffect(() => {    
      let temp = _retrieveData();
      setLanguage(temp);
      //alert('Test für Sprache: '+temp);
    },[]);
  
    
    async function _retrieveData () {
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

  function CheckIfInputIsValid(checking, value) {
    if (isNaN(checking)) {
      Alert.alert(
        'No valid entry',
        'Please check your ' + value + '.',
      );
      return false;
    } else {
      return true;
    }
  }

  async function CalculateBmi() {
    //check whether entries have been made
    let temp, tempWeight, tempHeight;
    if (weight == 0 || height == 0 || age == 0 || gender == '') {
      setVisibleResults(false);
      Alert.alert(
        i18n.t('missingValueHeader'),
        i18n.t('missingValueText'),
      );

    } else {
      //entries have been made, calculate bmi

      if (CheckIfInputIsValid(age, 'age')) {
        tempWeight = parseInt(weight, 10);
        tempHeight = parseInt(height, 10);

        temp = tempWeight / ((tempHeight / 100) * (tempHeight / 100));
        temp = Math.round(temp * 100 + Number.EPSILON) / 100;

        setBmi(temp);
        CalculateResult(temp);

      } else return;

    }
  }

  async function CalculateResult(bmiTemp) {
    let help = age;
    if (gender == 'M') {
      switch (age) {
        case '1' - '7': {
          checkBMI(12.2, 13.3, 18.0, 23.1, bmiTemp);
        }; break;
        case '8': {
          checkBMI(12.2, 13.2, 18.8, 22.3, bmiTemp);
        }; break;
        case '9': {
          checkBMI(13.0, 13.7, 19.8, 23.4, bmiTemp);
        }; break;
        case '10': {
          checkBMI(13.4, 14.2, 20.7, 23.4, bmiTemp);
        }; break;
        case '11': {
          checkBMI(13.8, 14.7, 20.8, 22.9, bmiTemp);
        }; break;
        case '12': {
          checkBMI(14.8, 15, 21.5, 23.4, bmiTemp);
        }; break;
        case '13': {
          checkBMI(15.2, 15.6, 22, 24.4, bmiTemp);
        }; break;
        case '14': {
          checkBMI(16.2, 17, 23.2, 26, bmiTemp);
        }; break;
        case '15': {
          checkBMI(16.9, 17.8, 23.2, 27.6, bmiTemp);
        }; break;
        case '16': {
          checkBMI(16.9, 17.8, 22.8, 24.2, bmiTemp);
        }; break;
        case '17': {
          checkBMI(17.1, 17.8, 23.4, 25.7, bmiTemp);
        }; break;
        case '18': {
          checkBMI(17.6, 18.3, 23.5, 25, bmiTemp);
        }; break;
        default: {
          if (help > 18 && help < 25) {
            checkBMI(16, 18, 24, 29, bmiTemp);
          } else if (help > 24 && help < 35) {
            checkBMI(17, 19, 26, 30, bmiTemp);
          } else if (help > 34 && help < 45) {
            checkBMI(18, 20, 27, 31, bmiTemp);
          } else if (help > 44 && help < 55) {
            checkBMI(19, 21, 28, 32, bmiTemp);
          } else if (help > 54 && help < 67) {
            checkBMI(20, 22, 29, 33, bmiTemp);
          } else if (help > 66) {
            checkBMI(21, 23, 30, 34, bmiTemp);
          } else {
            Alert.alert(
              i18n.t('noValidHeader'),
              i18n.t('noValidText'),
            );
          }
        }
      }

    } else if (gender == 'F') {
      switch (age) {
        case '7': {
          checkBMI(13, 13.6, 19.2, 21.1, bmiTemp);
        }; break;
        case '8': {
          checkBMI(12.5, 14.2, 19.3, 22.6, bmiTemp);
        }; break;
        case '9': {
          checkBMI(12.8, 13.7, 19.4, 21.6, bmiTemp);
        }; break;
        case '10': {
          checkBMI(13.9, 14.6, 21.4, 25, bmiTemp);
        }; break;
        case '11': {
          checkBMI(14, 14.3, 21.2, 23, bmiTemp);
        }; break;
        case '12': {
          checkBMI(14.6, 14.8, 22, 24.8, bmiTemp);
        }; break;
        case '13': {
          checkBMI(15.6, 16.2, 21.7, 24.5, bmiTemp);
        }; break;
        case '14': {
          checkBMI(16.1, 16.7, 22.6, 25.7, bmiTemp);
        }; break;
        case '15': {
          checkBMI(17, 17.8, 23.1, 25.9, bmiTemp);
        }; break;
        case '16': {
          checkBMI(17.8, 18.5, 23.7, 26, bmiTemp);
        }; break;
        case '17': {
          checkBMI(17.6, 18.6, 23.7, 25.8, bmiTemp);
        }; break;
        case '18': {
          checkBMI(17.6, 18.6, 24, 26.8, bmiTemp);
        }; break;
        default: {
          if (age > 18 && age < 25) {
            checkBMI(16, 18, 24, 29, bmiTemp);
          } else if (age > 24 && age < 35) {
            checkBMI(17, 19, 26, 30, bmiTemp);
          } else if (age > 34 && age < 45) {
            checkBMI(18, 20, 27, 31, bmiTemp);
          } else if (age > 44 && age < 55) {
            checkBMI(19, 21, 28, 32, bmiTemp);
          } else if (age > 54 && age < 67) {
            checkBMI(20, 22, 29, 33, bmiTemp);
          } else if (age > 66) {
            checkBMI(21, 23, 30, 34, bmiTemp);
          } else {
            Alert.alert(
              i18n.t('noValidHeader'),
              i18n.t('noValidText'),
            );
          }
        }
      }

    }

  }

  async function checkBMI(starkUntergewicht, untergewicht, uebergewicht, starkUebergewicht, bmiTemp) {
    if (starkUntergewicht > bmiTemp ) {
      setResultTextColor('red');
      setResultText(i18n.t('anorexia'));
    } else if (bmiTemp > starkUntergewicht && bmiTemp < untergewicht) {
      setResultTextColor('orange');
      setResultText(i18n.t('underWeight'));
    } else if (bmiTemp > untergewicht && bmiTemp < uebergewicht) {
      setResultTextColor('green');
      setResultText(i18n.t('normalWeight'));
    } else if (bmiTemp < starkUebergewicht && bmiTemp > uebergewicht) {
      setResultText(i18n.t('overWeight'));
      setResultTextColor('orange');
    } else if (bmiTemp > uebergewicht) {
      setResultTextColor('red');
      setResultText(i18n.t('obesity'));
    }
    setTimeout(()=>{
      setVisibleResults(true);
    },500)
    
  }

  function SelectGender(gender) {
    if (gender == 'M') {
      setGender('M');
      setColorFemale('lightgray');
      setColorMale('black');
    } else if (gender == 'F') {
      setGender('F');
      setColorFemale('black');
      setColorMale('lightgray');
    } else {
      setGender('');
    }
  }

  return (

    <View style={styles.container}>

      {
        <TouchableOpacity style={styles.settingButton} onPress={() => setModalVisible(!modalVisible)}>
          <Icon name='settings-outline' size={25} />
        </TouchableOpacity>

      }

      <View>
        <Modal style={{ alignItems: 'center' }} animationType="slide" transparent={true} visible={modalVisible} >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={{ fontSize: 20 }}>{i18n.t('settingsText')}</Text>
              </View>

              <View style={{ paddingTop: 40 }}>
                <View>
                  <Text style={{ fontSize: 15 }}>{i18n.t('changeLanguage')}</Text>
                </View>
                <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>DE</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Text>ENG</Text>
                </View>
              </View>

              <View style={{ paddingTop: 40 }}>
                <Button title={i18n.t('saveChangesButton')} onPress={() => setModalVisible(!modalVisible)}></Button>
              </View>
            </View>
          </View>

        </Modal>
      </View>


      <View style={styles.headerView}>
        <Text style={styles.headerText}>{i18n.t('headerText')}</Text>
      </View>

      <View>

        <View style={styles.inputSection}>
          <View style={styles.inputView}>

            <View style={{ flexDirection: 'row' }}>
              <View>
                <TouchableOpacity onPress={() => SelectGender('M')}>
                  <Icon name='gender-male' size={50} color={colorMale} />
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity onPress={() => SelectGender('F')}>
                  <Icon name='gender-female' size={50} color={colorFemale} />
                </TouchableOpacity>
              </View>

            </View>

          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder={i18n.t('ageText')} keyboardType="numeric" returnKeyType="done" maxLength={3} onChangeText={(value) => setAge(value)}></TextInput>
            <Text style={styles.informationText}>{i18n.t('ageDetail')}</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder={i18n.t('weightText')} keyboardType="numeric" returnKeyType="done" maxLength={5} onChangeText={(value) => setWeight(value)}></TextInput>
            <Text style={styles.informationText}>{i18n.t('weightDetail')}</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder={i18n.t('heightText')} keyboardType="numeric" returnKeyType="done" maxLength={5} onChangeText={(value) => setHeight(value)}></TextInput>
            <Text style={styles.informationText}>{i18n.t('heightDetail')}</Text>
          </View>
        </View>

      </View>

      <View style={styles.results}>
        <Results visible={visibleResults} bmi={bmi} resultTextProp={resultText} color={resultTextColor} />
      </View>


      <View style={styles.buttonView}>
        <Button title={i18n.t('buttonText')} onPress={() => CalculateBmi()}></Button>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
  },
  settingButton: {
    position: 'absolute',
    top: 30,
    right: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  headerView: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 10
  },
  headerText: {
    color: "black",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2.5,
    borderRadius: 10,
    width: windowWidth * 0.4,
    height: windowHeight * 0.15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 10,
  },
  input: {
    fontSize: 30,
  },
  informationText: {
    color: 'gray',
    paddingTop: 10
  },
  results: {
    marginTop: 10,
    paddingTop: 20,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2.5,
    borderRadius: 10,
    width: windowWidth * 0.85,
    height: windowHeight * 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 10,
  },
  buttonView: {
    position: 'absolute',
    bottom: 30,
    width: '80%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
});
