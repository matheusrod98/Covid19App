import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

import { height, width } from "../constants/dimensions"

const FeedHeader = () => {
    return (
        <View style = { styles.container }>
            <Image 
                source = { require ("../assets/images/covidTitle_small.png") }
                style = { styles.image }
                resizeMode = "contain"
            />

            <TouchableOpacity style = { styles.button }>
                <Text style = { styles.text }> O que está acontecendo na sua quarentena? </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },

    image: {
        width: width * 0.55,
        height: height * 0.05,
    },

    button: {
        borderWidth: 2,
        borderRadius: 15,
        width: width * 0.9,
        height: height * 0.1,
        justifyContent: "center",
        borderColor:"#39cb7f",
    },

    text: {
        color: "gray",
        fontSize: 22,
        textAlign: "center",
        //textAlignVertical: "center",
    }
})
export default FeedHeader
