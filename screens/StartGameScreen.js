import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import Colors from '../constants/colors';

import CustomButton from '../components/ui/CustomButton';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

const StartGameScreen = ({ onPickNumber }) => {

    const [enteredNumber, setEnteredNumber] = useState('');

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText)
    }

    const resetInputHandler = () => {
        setEnteredNumber('')
    }

    const { width, height } = useWindowDimensions();

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number!",
                "Number has to be a number between 1 and 99.",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetInputHandler
                    }
                ]

            )
            return
        }

        onPickNumber(chosenNumber)

    }

    const marginTop = height < 380 ? 30 : 100


    return (
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
            <Title>Guess My Number</Title>
            <Card>
                <InstructionText>Enter a Number</InstructionText>


                <TextInput
                    style={styles.inputField}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    value={enteredNumber}
                    onChangeText={numberInputHandler}
                />
                <View style={styles.btnsWrapper}>
                    <View style={{ flex: 1 }}>
                        <CustomButton onPress={resetInputHandler}>Reset</CustomButton>
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomButton onPress={confirmInputHandler}>Confirm</CustomButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center'
    },
    inputField: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginTop: 8,
        marginBottom: 16,
        fontWeight: "bold",
        textAlign: 'center',
        marginHorizontal: "auto",
        alignSelf: "center"
    },
    btnsWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',

    }

})

export default StartGameScreen;