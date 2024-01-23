import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'number should be min length of 4')
    .max(16, 'number should be min length of 4')
    .required('Password should not be empty plz'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setisPasswordGenerated] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCse] = useState(true);
  const [symbol, setsymbol] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const uppercase = 'SDBJBSDHBAJHSDBJHAS';
    const lowercase = 'djsdfjsjdfjsbdfjs';
    const symbolchar = '%$%&^*&*(&(^%%#@';
    const numbercar = 3264625347265347;

    if (upperCase) characterList += uppercase;
    if (lowerCase) characterList += lowercase;
    if (symbol) characterList += symbolchar;
    if (numbers) characterList += numbercar;

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setisPasswordGenerated(true);
  };

  const createPassword = (character: String, passwordlength: number) => {
    let result = '';
    for (let i = 0; i < passwordlength; i++) {
      const characterIndex = Math.round(Math.random() * character.length);
      result += character.charAt(characterIndex);
    }

    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setUpperCase(false);
    setLowerCse(true);
    setNumbers(false)
    setisPasswordGenerated(false);
    setsymbol(false)
    
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
     initialValues={{ passwordLength: '' }}
     validationSchema={passwordSchema}
     onSubmit={ values => {
      console.log(values);
      generatePassword(+values.passwordLength) 
     }}
   >
     {({
       values,
       errors,
       touched,
       isValid,
       handleChange,
       handleSubmit,
       handleReset,
       /* and other goodies */
     }) => (
       <>
       <View style={styles.inputWrapper}>
        <View style={styles.inputColumn}>
          <Text style={styles.heading}>Password Length</Text>
          {touched.passwordLength && errors.passwordLength && (
            <Text style={styles.errorText}>
              {errors.passwordLength}
            </Text>
          )}
          
        </View>
        <TextInput
          style={styles.inputStyle}
          value={values.passwordLength}
          onChangeText={handleChange('passwordLength')}
          placeholder="Ex. 8"
          keyboardType='numeric'
          />
       </View>
       <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include lowercase</Text>
        <BouncyCheckbox
        disableBuiltInState
        isChecked={lowerCase}
        onPress={() => setLowerCse(!lowerCase)}
        fillColor="#29AB87"
        />
       </View>
       <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Uppercase letters</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={upperCase}
                  onPress={() => setUpperCase(!upperCase)}
                  fillColor="#FED85D"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Numbers</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={numbers}
                  onPress={() => setNumbers(!numbers)}
                  fillColor="#C9A0DC"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Symbols</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={symbol}
                  onPress={() => setsymbol(!symbol)}
                  fillColor="#FC80A5"
                />
              </View>

       <View style={styles.formActions}>
        <TouchableOpacity
        disabled={!isValid}
        style={styles.primaryBtn}
        onPress={()=> handleSubmit()}
       
        >
          <Text style={styles.primaryBtnTxt}>Generate Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={ () => {
          handleReset();
          resetPassword();
        }}
        >
          <Text style={styles.secondaryBtnTxt}>Reset</Text>
        </TouchableOpacity>
       </View>
       </>
     )}
        </Formik>
      </View>
      {isPasswordGenerated ? (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.subTitle}>Result:</Text>
          <Text style={styles.description}>Long Press to copy</Text>
          <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
        </View>
      ) : null}

      
    </SafeAreaView>
  </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});


<View style={styles.formActions} >
<TouchableOpacity> <Text>Generate Password</Text></TouchableOpacity>
{/* <TouchableOpacity> <Text>Reset</Text></TouchableOpacity> */}

</View>