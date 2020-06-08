import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import { width, height } from "../constants/dimensions"

const Post = ({ data, onFeed }) => {
    const { usuario, titulo, texto, imagem } = data
    const navigation = useNavigation ();

    return (
        <View style = { styles.container }>
            <Text style = { styles.user }> { usuario } </Text>
            <Text style  = { styles.title }> { titulo } </Text>
            <Text style = { styles.text }> { texto } </Text>
            { Image && (
                <Image 
                style = { styles.image }
                source = {{ uri: `http://127.0.0.1:8000${ imagem }`}}
            />
            )}
            { onFeed && <TouchableOpacity style =  { styles.commentButton } onPress =  { () => navigation.navigate ("comment"), { data: data } }>
                <MaterialCommunityIcons name="comment-text-multiple-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity> }
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: "#dadada",
        marginTop: 10,
        width: width * 0.9,
        height: height * 0.5,
        padding: width * 0.03,
        borderRadius: 3,
    },

    user: {
        color: "#39cb7f",
        fontWeight: "bold",
        fontSize: 19,
    },

    title: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: height * 0.02
    },

    text: {
        fontSize: 16,
        textAlign: "justify",
        marginTop: height * 0.02,
    },
    
    image: {
        marginTop: height * 0.03,
        width: "100%",
        height: width * 0.8,
        borderRadius: 5,
    },

    commentButton: {
        position: "absolute",
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.1 / 2,
        backgroundColor: "#75FFAF",
        marginLeft: width * 0.7,
        top: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Post
