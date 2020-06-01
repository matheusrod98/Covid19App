import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, AsyncStorage, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import api from '../services/api'
import Post from "../components/Post"
import FeedHeader from "../components/FeedHeader"
import { width, height } from "../constants/dimensions"
import { MaterialCommunityIcons  } from '@expo/vector-icons';

export default function FeedScreen ({navigation: {navigate}}) {
    const [posts, setPosts] = useState (null)
    const [postCount, setPostCount] = useState (null)
    const [loadingPosts, setLoadingPosts] = useState (true)

    async function loadPosts () {
        setLoadingPosts (true)

        try {
            const response = await api.get ("/postagens/")
            setPosts (response.data.reverse ())
            setPostCount (response.data.lenght)
            console.log ("Nossa data: ", response.data)
        }

        catch (error) {
            console.log (error)
        }

        finally {
            setLoadingPosts (false)
        }
    }

    useEffect (() => {
        loadPosts ()
    }, [])

    async function Logout () {
        try {
            await AsyncStorage.removeItem ('user')
        }
        catch (error) {
            console.log (error);
            alert ("Não conseguimos pegar os dados da API.")
        }

        finally {
            navigate ('Login');
        }
    }
    
    return (
        <SafeAreaView style = { styles.container }>
            { loadingPosts ? (<ActivityIndicator size = "large" />) : 
                (
                    <FlatList 
                        ListHeaderComponent = { <FeedHeader navigate = { navigate } count = { postCount } /> }
                        data = {posts}
                        showsVerticalScrollIndicator = { false }
                        keyExtractor = {(item) => String (item.id)}
                        renderItem = {({item}) => <Post data = { item } />}
                        accessibilityElementsHidden = { false }
                    />
                )
            }

            <TouchableOpacity style = { styles.reloadButton } onPress = { () => loadPosts () }>
                <MaterialCommunityIcons name="reload" size={ width * 0.07 } color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity style = { styles.logoutButton } onPress = { () => Logout () }>
                <MaterialCommunityIcons name="logout" size={ width * 0.07 } color="#FFFFFF" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: height * 0.08,
    },

    reloadButton: {
        position: "absolute",
        top: height * 0.06,
        left: width * 0.02,
        height: width * 0.1,
        width: width * 0.1,
        borderRadius: (width * 0.1) / 2,
        backgroundColor: "#75FFAF",
        alignItems: "center",
        justifyContent: "center"
    },

    logoutButton: {
        position: "absolute",
        top: height * 0.06,
        right: width * 0.02,
        height: width * 0.1,
        width: width * 0.1,
        borderRadius: (width * 0.1) / 2,
        backgroundColor: "#75FFAF",
        alignItems: "center",
        justifyContent: "center"
    },
})
