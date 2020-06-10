import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { height, width } from "../constants/dimensions";

const Comment = () => {
    return (
        <View style = { styles.container }>
            <Text style = { styles.user }>{ data.usuario }</Text>
            <Text style = { styles.text }>{ data.texto }</Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        borderBottomColor: "gray",
        borderBottomWidth: height * 0.001,
        height: height * 0.09,
        marginTop: 5,
        paddingVertical: height * 0.014,
        paddingLeft: width * 0.01
    },

    user: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#39CB7F"
    },

    text: {
        paddingTop: 10,
        fontSize: 16,
        textAlign: "justify",
    }
})
export default Comment;
