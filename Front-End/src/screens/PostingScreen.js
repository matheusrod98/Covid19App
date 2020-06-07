import React,{ useState, useLayoutEffect } from 'react'
import { SafeAreaView, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text, AsyncStorage, } from 'react-native'
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

import { height, width } from "../constants/dimensions"
import { Entypo  } from '@expo/vector-icons';
import api from "../services/api"

const PostingScreen = ({ navigation }) => {
    const [title, setTitle] = useState ("")
    const [text, setText] = useState ("")
    const [image, setImage] = useState (null)

    async function post () {
        try {
            const user = await AsyncStorage.getItem ("user")

            if (image) {
                const form_data = new FormData ()
                form_data.append ("usuario", user)
                form_data.append ("titulo", title)
                form_data.append ("texto", text)
                form_data.append ("image", {
                    type: "image/jpg",
                    uri: image,
                    name: "userName.jpg",
                })

                const response = await api.post ("/postagens/", form_data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            }

            else {
                const postData = {
                    usuario: user,
                    titulo: title,
                    texto: text,
                    image: null
                }
                
                jsonPostData = JSON.stringify (postData)
                
                const response = await api.post ("/postagens/", jsonPostData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                navigation.navigate ("Feed", { newPost: response.data })
            }
        }

        catch (error) {
            alert ("Ocorreu algum problema...")
            navigation.navigate ("Feed");
        }
    }

    useLayoutEffect ( () => {
        navigation.setOptions ({
            headerRight: () => (
                <TouchableOpacity style = { styles.headerPostButton } onPress = { () => post () }>
                    <Text style = { styles.headerPostButtonText }>Postar</Text>
                </TouchableOpacity>
            ),
        })
    }, [navigation, title, text, image])

    async function chooseFromGallery () {
        const { status } = await Permissions.askAsync (Permissions.CAMERA_ROLL)

        if (status === "granted") {
            const result  = await ImagePicker.launchImageLibraryAsync ({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1,
            })

            if (!result.cancelled) {
                setImage (result.uri)
            }
        }
    }
            
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

                <TouchableOpacity style = { styles.imageButton } onPress = { () => chooseFromGallery () }>
                    <Entypo name = "image" size = {24} color = "#FFFFFF" />
                    <Text style = { styles.imageButtonText }>Adicionar imagem </Text>
                </TouchableOpacity>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    )
}

export default PostingScreen

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },

    headerPostButton: {
        backgroundColor: "#75FFAF",
        width: width * 0.2,
        height: height * 0.05,
        borderRadius: width * 0.1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: width * 0.03,
    },

    headerPostButtonText: {
        color: "#FFFFFF",
        fontSize: height * 0.023,
        fontWeight: "bold",
    },

    imageButton: {
        backgroundColor: "#75FFAF",
        height: height * 0.08,
        width: width * 0.45,
        marginTop: height * 0.05,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "space-around",
        borderRadius: width * 0.1,
        flexDirection: "row",
    },

    imageButtonText: {
        color: "#FFFFFF",
        fontSize: height * 0.023,
        fontWeight: "bold",
    },

    titleInput: {
        height: height * 0.07,
        borderColor: "#75FFAF",
        borderWidth: 1,
        color: "black",
        width: width * 0.9,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#E8E8E8",
    },

    textInput: {
        borderColor: "#75FFAF",
        color: "black",
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        height: height * 0.3,
        marginTop: height * 0.01,
        width: width * 0.9,
        alignSelf: "center",
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    }
})
