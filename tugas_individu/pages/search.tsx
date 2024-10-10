import React, { useState } from 'react';
import { Button, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { View, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { Avatar, IconButton, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({navigation}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const headerTranslateY = new Animated.Value(0); 
    const [text, setText] = useState('');

    const handleSearch = () => {
        const mockResults = ['Result 1', 'Result 2', 'Result 3'].filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setResults(mockResults);
    };

    const toggleSidebar = () => {
        // Implement sidebar toggle functionality
    };

    const mingyuImage = require('../assets/mingyu.jpg');

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header]}>
                <BlurView intensity={30} tint="dark" style={styles.blurBackground} />
                <Avatar.Image 
                    size={30} 
                    source={require('../assets/images (2).jpeg')} 
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.searchbarContainer} onPress={() => navigation.navigate('searchnext')}>
                    <View style={styles.searchbar}>
                        <MaterialIcons name="search" size={20} color="white" style={styles.searchIcon} />
                        <Text style={styles.placeholder}>Search</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsContainer}>
                    <MaterialIcons name="settings" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
            {results.length > 0 && (
                <View style={styles.results}>
                    {results.map((result, index) => (
                        <Text key={index} style={styles.resultItem}>
                            {result}
                        </Text>
                    ))}
                </View>
            )}

            <Animated.ScrollView>
                <View>
                    <View style={styles.categories}>
                        <Text style={styles.categoriesText}>For You</Text>
                        <Text style={styles.categoriesText}>Trending</Text>
                        <Text style={styles.categoriesText}>News</Text>
                        <Text style={styles.categoriesText}>Sports</Text>
                        <Text style={styles.categoriesText}>Entertainment</Text>
                    </View>
                </View>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 10 }} />
                <View style={styles.imageContainer}>
                    <Image source={mingyuImage} style={styles.image} />
                    <View style={styles.overlayTextContainer}>
                        <Text style={styles.overlayText1}>April 6, 2024</Text>
                        <Text style={styles.overlayText}>This is Mingyu</Text>
                    </View>
                </View>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Anita</Text>
                    <Text style={styles.text1}>25.6K posts</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.text2}>Trending in Entertainment</Text>
                        <IconButton
                            icon="dots-horizontal" 
                            size={14}
                            onPress={() => console.log('Titik tiga di klik')}
                        />
                    </View>
                </View>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Anita</Text>
                    <Text style={styles.text1}>25.6K posts</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.text2}>Trending in Entertainment</Text>
                        <IconButton
                            icon="dots-horizontal" 
                            size={14}
                            onPress={() => console.log('Titik tiga di klik')}
                        />
                    </View>
                </View>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Anita</Text>
                    <Text style={styles.text1}>25.6K posts</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.text2}>Trending in Entertainment</Text>
                        <IconButton
                            icon="dots-horizontal" 
                            size={14}
                            onPress={() => console.log('Titik tiga di klik')}
                        />
                    </View>
                </View>
            </Animated.ScrollView>

            <Animated.View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="home" size={24} color="white" onPress={() => navigation.navigate('Home')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="search" size={24} color="white" onPress={() => navigation.navigate('search')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialCommunityIcons name="slash-forward-box" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="people" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="notifications" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="email" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 17,
        backgroundColor: '#000000',
        borderBottomColor: 'gray',
        zIndex: 1, 
    },
    blurBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    avatar: {
        marginRight: 10,
    },
    searchbarContainer: {
        flex: 4,
        alignItems: 'center',
    },
    settingsContainer: {
        marginLeft: 'auto',
    },
    results: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    resultItem: {
        padding: 8,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#000000',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    navItem: {
        alignItems: 'center',
    },
    searchIcon: {
        marginRight: 5,
    },
    searchbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2C2C2E',
        borderRadius: 25,
        paddingHorizontal: 15,
        width: '85%',
        height: 30,
    },
    placeholder: {
        color: 'white',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    categoriesText: {
        color: 'white',
        fontSize: 12,
    },
    imageContainer: {
        position: 'relative',  
        width: '100%',
        height: 175,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlayTextContainer: {
        position: 'absolute',
        bottom: 10, 
        left: 10,    
        padding: 5,  
        borderRadius: 5,  
    },
    overlayText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    overlayText1: {
        color: 'white',
        fontSize: 12,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 15,
    },
    text1: {
        color: 'gray',
        fontSize: 10,
        marginTop: 5,
    },
    text2: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 10,
        marginBottom: 20,
    },
    infoContainer: {
        paddingLeft: 10,
    },
});

export default Search;
