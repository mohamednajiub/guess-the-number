import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import CustomButton from '../components/ui/CustomButton';
import Title from '../components/ui/Title';
import generateRandomBetween from '../utils/generateRandomBetween';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem';

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {

    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    const nextGuessHandler = (direction) => {

        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'higher' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You know this is wrong...", [
                {
                    text: "Sorry",
                    style: 'cancel',
                }
            ])
            return
        }


        if (direction === 'lower') {
            maxBoundary = currentGuess;

        }

        if (direction === 'higher') {
            minBoundary = currentGuess + 1;
        }

        const newRndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess)

        setCurrentGuess(newRndNum)

        setGuessRounds(prev => {
            return [
                newRndNum,
                ...prev,
            ]
        })
    }

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100
    }, [])

    const guessRoundsListLength = guessRounds.length
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={{ marginBottom: 12 }}>Enter a Number</InstructionText>

                <View style={styles.btnsWrapper}>
                    <View style={{ flex: 1 }}>
                        <CustomButton onPress={() => nextGuessHandler('higher')}>
                            <Ionicons name='md-add' size={24} />

                        </CustomButton>
                    </View>
                    <View style={{ flex: 1 }}>

                        <CustomButton onPress={() => nextGuessHandler('lower')}>
                            <Ionicons name='md-remove' size={24} />
                        </CustomButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => {
                        return <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
    },
    btnsWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})

export default GameScreen;