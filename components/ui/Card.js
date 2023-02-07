import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

const Card = ({ children }) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 24,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        // shadow for android
        elevation: 8,
        // shadow for ios
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        shadowOpacity: 0.25
    },


})
export default Card