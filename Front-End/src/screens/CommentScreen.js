import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, FlatList, KeyboardAvoidingView } from 'react-native'
import {TextInput} from 'react-native-gesture-handler'

import { width, height } from '../constants/dimensions'
import CommentHeader from "../components/CommentHeader";

export default function CommentScreen ({ route }) {
    const [comment, setComment] = useState ("")
    
    const handleCommentSubmit = () => {
        alert ("Botão clicado.")
    }

    const data = [
        { id: 1 }
    ]

    return (
        <KeyboardAvoidingView 
            style = {{ flex: 1 }}
            behavior = { Platform.OS == "ios" ? "padding" : null }
            keyboardVerticalOffset = { Platform.OS == "ios" ? height * 0.1 : null }
        >
            <SafeAreaView style = { styles.container }>
                <FlatList
                    data = { data }
                    keyExtractor =  { (comment) => string (comment.id) }
                    showsVerticalScrollIndicator = { false }
                    ListHeaderComponent = { CommentHeader }
                />
                style = { styles.container }>
                <View style = { styles.inputContainer }>
                    <TextInput
                        style = { styles.input }
                        placeholder = "Escreva o seu comentário."
                        value = { comment }
                        onChangeText = { (newComment) => setComment (newComment) }
                        multiline
                        fontSize = { 17 }
                        autoCorrect = { false }
                    />
                    <TouchableOpacity style = { styles.commentButton } onPress =  { handleCommentSubmit }>
                        <Text style = { styles.commentButtonText }>Comentar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#E8E8E8",
        paddingLeft: width * 0.04,
        paddingRight: width * 0.02,
        width: width,
        height: height * 0.17,
        borderTopWidth: width * 0.002,
        borderBottomWidth: width * 0.002,
        borderColor: 'rgb(56,68,77)',
    },

    input: {
        backgroundColor: "#F2F2F2",
        height: height * 0.06,
        width: width * 0.65,
        borderColor: "#39cb7f",
        borderRadius: width * 0.3,
        borderWidth: 2,
        paddingVertical: height * 0.008,
        paddingHorizontal: width * 0.06,
        justifyContent: "center",
    },

    commentButton: {
        width: width * 0.25,
        height: height * 0.06,
        borderRadius: width * 0.02,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#75FFAF",
    },

    commentButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 20,
    }
})
