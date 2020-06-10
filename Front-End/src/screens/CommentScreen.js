import React, { useState, useLayoutEffect } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Keyboard } from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"

import { width, height } from '../constants/dimensions'
import CommentHeader from "../components/CommentHeader";
import Comment from "../components/Comment";
import api from "../services/api";

export default function CommentScreen ({ route, navigation }) {
    const [comment, setComment] = useState ("")
    const [user, setUser] = useState ("");
    const [commentsList, setCommentsList] = useState (null);
    const [count, setCount] = useState (null);

    useEffect (() => { 
        loadUser ();
        loadComments ();
    }, []);

    useLayoutEffect (() => {
        navigation.setOptions ({
            headerLeft: () => (
                <TouchableOpacity onPress = { () => navigation.pop () }>
                    <MaterialIcons name = "arrow-back" size = { 35 } color = "#39CB7F"/>
                </TouchableOpacity>
            ),

            headerRight: () => (
                <TouchableOpacity onPress = { () => loadComments }>
                    <MaterialCommunityIcons name = "reload" size = { 35 } color = "#39CB7F"/>
                </TouchableOpacity>
            )
        }) 
    }, []);

    const id = route.params.id;

    async function loadComments () {
        try {
            const response = await api.get (`/postagens/${ id }/comentarios/`);
            setCommentsList (response.data.comentarios);
            setCount (response.data.comentarios.lenght);
        }

        catch (error) {
            console.log (error);
        }
    }

    async function loadUser () {
        const response = await AsyncStorage.getItem ("user");
        setUser (response);
    } 

    const handleCommentSubmit = async () => {
        try {
            const newPost = {
                usuario: user,
                texto: comment,
                postagem: id
            }

            const response = await api.post ('/comentarios/', newPost);
            setCommentsList ([...commentsList, response])
            setCount (count + 1);
        }
        
        catch (error) {
            Alert.alert ("Seu comentário não foi postado.");
        }

        finally {
            Keyboard.dismiss ();
            setComment ("");
        }
    }

    return (
        <KeyboardAvoidingView 
            style = {{ flex: 1 }}
            behavior = { Platform.OS == "ios" ? "padding" : null }
            keyboardVerticalOffset = { Platform.OS == "ios" ? height * 0.1 : null }
        >
            <SafeAreaView style = { styles.container }>
                <FlatList
                    data = { commentsList }
                    keyExtractor =  { (comment) => string (comment.id) }
                    showsVerticalScrollIndicator = { false }
                    ListHeaderComponent = { <CommentHeader data = { route.params.data } count = { count }/>}
                    renderItem = { ({ item }) => <Comment data = { item }/> } 
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
