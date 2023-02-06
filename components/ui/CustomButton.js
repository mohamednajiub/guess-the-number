import { View, Text, Pressable, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

function CustomButton({ children, style, onPress }) {
    const pressHandler = () => {
        onPress()
    }

    return (
        <View style={[styles.btnOuterContainer, style]}>
            <Pressable
                style={({ pressed }) => pressed ? [styles.btnInnerContainer, styles.pressed] : styles.btnInnerContainer}
                onPress={pressHandler}
                android_ripple={{ color: Colors.primary600 }}
            >
                <Text style={styles.btnText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    btnOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden"
    },

    btnInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },

    btnText: {
        color: "#fff",
        textAlign: "center"
    },

    pressed: {
        opacity: 0.75,

    }
})