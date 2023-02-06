import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient'
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
}

export default function App() {


  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare()

  }, [])

  if (!fontsLoaded) {

    return null

  } else {
    SplashScreen.hideAsync()
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds)
    setGameIsOver(true)
  }


  const StartNewGame = () => {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={StartNewGame} />
  }

  return (
    <>
      <StatusBar style="inverted" />

      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/images/dices.jpg')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={{
            opacity: 0.15,

          }}
        >
          <SafeAreaView style={styles.rootScreen} >
            {screen}
          </SafeAreaView>

        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  }
});
