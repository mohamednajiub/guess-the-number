import { View, Image, StyleSheet, Text } from "react-native";
import Title from '../components/ui/Title'
import CustomButton from '../components/ui/CustomButton'
import Colors from '../constants/colors';

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {

    return (
        <View style={styles.rootContainer}>
            <Title>Game Over!</Title>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/success.png')} />
            </View>

            <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> round to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
            <CustomButton onPress={onStartNewGame} style={{ marginTop: 20 }}>Start New Game</CustomButton>

        </View>
    )

}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36
    },
    image: {
        width: "100%",
        height: "100%"
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: "center"

    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }

})

export default GameOverScreen;