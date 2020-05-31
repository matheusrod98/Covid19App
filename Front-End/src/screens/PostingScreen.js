import React, {useState} from 'react'
import { SafeAreaView, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { height, width } from "../constants/dimensions"
const PostingScreen = () => {
    const [title, setTitle] = useState ("")
    const [text, setText] = useState ("")
            
    return (
        <TouchableWithoutFeedback onPress = { () => Keyboard.dismiss () }>
            <SafeAreaView style = { styles.container }>
            <TextInput 
                value = { title }
                onChangeText = { (title) => setTitle (title) }
                style = { styles.titleInput } 
                placeholder = "Título da sua publicação"
            />
            <TextInput 
                value = { text }
                onChangeText = { (text) => setText (text) }
                style = { styles.textInput } 
                placeholder = "O que está acontecendo na sua quarentena?"
                multiline
            />
        </SafeAreaView>
    </TouchableWithoutFeedback>
    )
}

export default PostingScreen

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },

    titleInput: {
        height: height * 0.07,
        borderColor: "#75FFAF",
        borderWidth: 1,
        width: width * 0.9,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 20,
        padding: 5,
        borderRadius: 10,
        backgroundColor: "#dadada",
    },

    textInput: {
        borderColor: "#75FFAF",
        backgroundColor: "#dadada",
        borderWidth: 1,
        height: height * 0.3,
        marginTop: height * 0.01,
        width: width * 0.9,
        alignSelf: "center",
        fontSize: 20,
        padding: 5,
        borderRadius: 10,
    }
})
