import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, Animated, TouchableOpacity, Modal } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const hanniImage = require('../assets/Hanni.webp');
const phamImage = require('../assets/images (2).jpeg');
const lisaImage = require('../assets/lisa.jpg');
const yamalImage = require('../assets/yamal.jpg');

const posts = [
    { id: 1, type: 'text', content: 'Hanni Pham', profil: phamImage, name: 'Hanni Pham' },
    { id: 2, type: 'image', content: hanniImage, profil: lisaImage, name: 'Lisa' },
    { id: 3, type: 'text', content: 'Ador! clash with Hybe', profil: lisaImage, name: 'Lisa' },
    { id: 4, type: 'image', content: hanniImage, profil: yamalImage, name: 'Yamal' },
    { id: 5, type: 'text', content: 'Yet another text post', profil: phamImage, name },
    { id: 6, type: 'image', content: hanniImage },
    { id: 7, type: 'text', content: 'One more text post' },
    { id: 8, type: 'image', content: hanniImage },
    { id: 9, type: 'text', content: 'Last text post' },
];

const loadFonts = async () => {
    await Font.loadAsync({
      'TwitterChirp': require('../assets/fonts/Chirp-Regular.ttf'),
    });
};

const Home = ({navigation}) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [scrollY] = useState(new Animated.Value(0));
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('up'); 
    const headerTranslateY = useRef(new Animated.Value(0)).current; 
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const sidebarTranslateX = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
    const mainContentTranslateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadAsyncFonts = async () => {
            await loadFonts();
            setFontsLoaded(true);
        };
        loadAsyncFonts();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const handleScroll = (event) => {
        const currentScrollPosition = event.nativeEvent.contentOffset.y;

        if (currentScrollPosition > lastScrollPosition && scrollDirection !== 'down') {
            setScrollDirection('down');
            hideNavbar(); 
        } else if (currentScrollPosition < lastScrollPosition && scrollDirection !== 'up') {
            setScrollDirection('up');
            showNavbar(); 
        }

        setLastScrollPosition(currentScrollPosition);
    };

    const hideNavbar = () => {
        Animated.timing(headerTranslateY, {
            toValue: -60, 
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const showNavbar = () => {
        Animated.timing(headerTranslateY, {
            toValue: 0, 
            duration: 300, 
            useNativeDriver: true,
        }).start();
    };

    const toggleSidebar = () => {
        if (sidebarVisible) {
            Animated.parallel([
                Animated.timing(sidebarTranslateX, {
                    toValue: -Dimensions.get('window').width,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(mainContentTranslateX, {
                    toValue: 0, 
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start(() => setSidebarVisible(false));
        } else {
            setSidebarVisible(true);
            Animated.parallel([
                Animated.timing(sidebarTranslateX, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(mainContentTranslateX, {
                    toValue: Dimensions.get('window').width * 0.7, 
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.mainContent, 
                    { 
                        transform: [{ translateX: mainContentTranslateX }], 
                    }
                ]}
            >
                <Animated.View 
                    style={[
                        styles.header, 
                        { 
                            transform: [{ translateY: headerTranslateY }], 
                        }
                    ]}
                >
                    <BlurView intensity={30} tint="dark" style={styles.blurBackground} />
                    <TouchableOpacity onPress={toggleSidebar}>
                        <Avatar.Image 
                            size={30} 
                            source={require('../assets/images (2).jpeg')} 
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image  
                            source={require('../assets/X_logo_2023_(white).png')} 
                            style={styles.logo}
                        />
                    </View>
                    <TouchableOpacity 
                        onPress={() => console.log('Upgrade pressed')} 
                        style={styles.button}
                    >
                        <Text style={styles.buttonLabel}>
                            Upgrade
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.ScrollView 
                    style={styles.scrollView} 
                    contentContainerStyle={styles.scrollViewContent}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false, listener: handleScroll }
                    )}
                    scrollEventThrottle={16}
                >
                    {posts.map(post => (
                        <View key={post.id} style={[styles.postContainer, { paddingTop: 0, marginTop: 0 }]}>
                            
                            {post.type === 'text' ? (
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <Avatar.Image 
                                                size={24} 
                                                source={post.profil} 
                                                style={{ marginRight: 10, marginLeft: 5 }}
                                            />
                                            <Text style={styles.postText1}>Hanni Pham</Text>
                                            <Text style={styles.postUN}>@queen_pham</Text>
                                        </View>
                                        <IconButton
                                            icon="dots-horizontal" 
                                            size={18}
                                            onPress={() => console.log('Titik tiga di klik')}
                                        />
                                    </View>
                                    <Text style={styles.postText}>{post.content}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="comment" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="repeat" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="favorite" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Ionicons name="stats-chart-sharp" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <FontAwesome5 name="bookmark" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="share" size={12} color="gray" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <Avatar.Image 
                                                size={24} 
                                                source={post.profil} 
                                                style={{ marginRight: 10, marginLeft: 5 }}
                                            />
                                            <Text style={styles.postText1}>Hanni Pham</Text>
                                            <Text style={styles.postUN}>@queen_pham</Text>
                                        </View>
                                        <IconButton
                                            icon="dots-horizontal" 
                                            size={18}
                                            onPress={() => console.log('Titik tiga di klik')}
                                        />
                                    </View>
                                    <Image source={post.content} style={styles.imagePost} />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="comment" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="repeat" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="favorite" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <Ionicons name="stats-chart-sharp" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <FontAwesome5 name="bookmark" size={12} color="gray" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionButton}>
                                            <MaterialIcons name="share" size={12} color="gray" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    ))}
                </Animated.ScrollView>
                <Animated.View style={styles.navBar}>
                    <TouchableOpacity style={styles.navItem}>
                        <MaterialIcons name="home" size={24} color="white" />
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
            </Animated.View>

            {/* Sidebar */}
            {sidebarVisible && (
                <Modal
                    transparent={true}
                    animationType="none"
                    visible={sidebarVisible}
                    onRequestClose={toggleSidebar}
                >
                    <TouchableOpacity style={styles.modalOverlay} onPress={toggleSidebar}>
                        <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarTranslateX }] }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Avatar.Image 
                                    size={30} 
                                    source={require('../assets/images (2).jpeg')} 
                                    style={[styles.avatar, { marginLeft: 30 }]}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                                    <Avatar.Image 
                                        size={20} 
                                        source={require('../assets/images (2).jpeg')} 
                                        style={styles.avatar}
                                    />
                                    <Avatar.Image 
                                        size={20} 
                                        source={require('../assets/images (2).jpeg')} 
                                        style={styles.avatar}
                                    />
                                    <IconButton
                                        icon="dots-horizontal"
                                        size={14}
                                        onPress={() => console.log('Titik tiga di klik')}
                                    />
                                </View>
                            </View>
                            <Text style={styles.sidebarUN}>Hanni Pham</Text>
                            <Text style={styles.sidebarInfo}>@queen_pham</Text>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <View style={{flexDirection: 'row', marginRight: 5}}>
                                    <Text style={styles.sidebarFollow}>100</Text>
                                    <Text style={[styles.sidebarInfo, { marginLeft: 5 }]}>Following</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginRight: 5}}>
                                    <Text style={styles.sidebarFollow}>50K</Text>
                                    <Text style={[styles.sidebarInfo, { marginLeft: 5 }]}>Followers</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={styles.sidebarNav}>
                                    <MaterialIcons name="person" size={24} color="white" style={styles.sidebarIcon}/>
                                    <Text style={{ color: 'white', marginLeft: 20 }}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sidebarNav}>
                                    <MaterialIcons name="verified" size={24} color="white" style={styles.sidebarIcon}/>
                                    <Text style={{ color: 'white', marginLeft: 20 }}>Twitter X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sidebarNav}>
                                    <MaterialIcons name="star" size={24} color="white" style={styles.sidebarIcon}/>
                                    <Text style={{ color: 'white', marginLeft: 20 }}>Premium</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sidebarNav}>
                                    <MaterialIcons name="bookmark" size={24} color="white" style={styles.sidebarIcon}/>
                                    <Text style={{ color: 'white', marginLeft: 20 }}>Bookmarks</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    blurBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    avatar: {
        marginLeft: 10,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 30, 
        height: 30, 
        marginLeft: 30,
        resizeMode: 'contain'
    },
    button: {
        marginRight: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    buttonLabel: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 11,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollViewContent: {
        paddingTop: 60,
        paddingBottom: 20,
    },
    postContainer: {
        backgroundColor: '#000000',
        marginTop: 0,
        marginBottom: 1,
        padding: 8,
    },
    postText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 20,
    },
    postText1: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    postUN: {
        color: 'gray',
        fontSize: 12,
        marginLeft: 5,
    },
    imagePost: {
        width: '90%',
        height: 175,
        borderRadius: 15,
        alignSelf: 'flex-end',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#000',
        borderTopWidth: 0.5,
        borderTopColor: '#333',
    },
    actionButton: {
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 1,
        marginRight: 5,
        padding: 1,
        borderRadius: 5,
        alignItems: 'center',
        opacity: 0.5,
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: Dimensions.get('window').width * 0.7,
        backgroundColor: '#111',
        zIndex: 2,
        paddingVertical: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    mainContent: {
        flex: 1,
        zIndex: 0,
    },
    navItem: {
        alignItems: 'center',
    },
    sidebarNav: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 10
    },
    sidebarIcon: {
        marginLeft: 30,
    },
    sidebarUN: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 10,
    },
    sidebarInfo: {
        color: 'grey',
        fontSize: 10,
        marginLeft: 30,
    },
    sidebarFollow: {
        color: 'white',
        fontSize: 10,
        marginLeft: 30,
    }
});

export default Home;
