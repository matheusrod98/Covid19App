import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, AsyncStorage, FlatList, Text, StyleSheet} from 'react-native';

import api from '../services/api'
import Post from "../components/Post"
import FeedHeader from "../components/FeedHeader"

export default function FeedScreen ({navigation: {navigate}}) {
    const [posts, setPosts] = useState (null)
    const [postCount, setPostCount] = useState (null)

    async function loadPosts () {
        try {
            const response = await api.get ("/postagens/")
            setPosts (response.data)
            setPostCount (response.data.lenght)
            console.log ("Nossa data: ", response.data)
        }

        catch (error) {
            console.log (error)
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
        }

        finally {
            navigate ('Login');
        }
    }
    
    return (
        <SafeAreaView style = { styles.container }>
            <FlatList 
                ListHeaderComponent = { <FeedHeader navigate = { navigate } count = { postCount } /> }
                data = {posts}
                showsVerticalScrollIndicator = { false }
                keyExtractor = {(item) => String (item.id)}
                renderItem = {({item}) => <Post data = { item } />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    }
})
