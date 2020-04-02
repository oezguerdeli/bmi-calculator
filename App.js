import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Results from './js/components/Results';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [gender, setGender] = useState('');
  const [colorMale, setColorMale] = useState('lightgray');
  const [colorFemale, setColorFemale] = useState('lightgray');
  const [visibleResults, setVisibleResults] = useState(false);
  const [resultTextColor, setResultTextColor] = useState('');
  const [resultText, setResultText] = useState('');

  function CalculateBmi() {
    //check whether entries have been made
    if (weight == 0 || height == 0 || age == 0 || gender == '') {
      setVisibleResults(false);
      alert('Please enter your values');
    } else {
      //entries have been made, calculate bmi
      let temp = weight / ((height / 100) * (height / 100));
      temp = Math.round(temp);
      setBmi(temp);
      CalculateResult();
      setVisibleResults(true);
    }
  }

  function CalculateResult() {
    if (bmi < 18.5) {
      setResultTextColor('red');
      setResultText("Underweight");
    } else if (bmi > 18.5 && bmi < 25) {
      setResultTextColor('green');
      setResultText("Normal Weight");
    } else if (bmi >= 25 && bmi < 30) {
      setResultText("Overweight");
      setResultTextColor('orange');
    } else {
      setResultTextColor('red');
      setResultText("Obesity");
    }
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

      {/*
        <View>
          <Icon name='settings-outline' size={20} />
        </View>
        */
      }


      <View style={styles.headerView}>
        <Text style={styles.headerText}>BMI Calculator</Text>
      </View>

      <View style={{ paddingTop: 10 }}>

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
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" returnKeyType="done" maxLength={3} onChangeText={(value) => setAge(value)}></TextInput>
            <Text style={styles.informationText}>in years</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder="Weight" keyboardType="numeric" returnKeyType="done" maxLength={5} onChangeText={(value) => setWeight(value)}></TextInput>
            <Text style={styles.informationText}>in kg</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder="Height" keyboardType="numeric" returnKeyType="done" maxLength={5} onChangeText={(value) => setHeight(value)}></TextInput>
            <Text style={styles.informationText}>in cm</Text>
          </View>
        </View>

      </View>

      <View style={styles.results}>
        <Results visible={visibleResults} bmi={bmi} resultText={resultText} color={resultTextColor} />
      </View>

      <View style={styles.buttonView}>
        <Button title="Calculate Your BMI" onPress={() => CalculateBmi()}></Button>
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
  headerView: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  headerText: {
    color: "black",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 2.5,
    borderRadius: 10,
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
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
    paddingTop: 30
  },
  buttonView: {
    position: 'absolute',
    bottom: 20,
  }
});
