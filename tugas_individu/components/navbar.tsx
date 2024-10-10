import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, Animated, TouchableOpacity, Modal } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Navbar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const headerTranslateY = useRef(new Animated.Value(0)).current;
    const sidebarTranslateX = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

    const toggleSidebar = () => {
        if (sidebarVisible) {
            Animated.timing(sidebarTranslateX, {
                toValue: -Dimensions.get('window').width,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setSidebarVisible(false)); // Set sidebarVisible to false after animation completes
        } else {
            setSidebarVisible(true);
            Animated.timing(sidebarTranslateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <View style={styles.container}>
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

            <Animated.View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <MaterialIcons name="search" size={24} color="white" />
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

            {sidebarVisible && (
                <Modal
                    transparent={true}
                    animationType="none"
                    visible={sidebarVisible}
                    onRequestClose={toggleSidebar}
                >
                    <TouchableOpacity style={styles.modalOverlay} onPress={toggleSidebar}>
                        <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarTranslateX }] }]}>
                            <View style={styles.sidebarHeader}>
                                <Avatar.Image 
                                    size={60} 
                                    source={require('../assets/images (2).jpeg')} 
                                    style={styles.sidebarAvatar}
                                />
                                <Text style={styles.sidebarName}>Hanni Pham</Text>
                            </View>
                            <View style={styles.sidebarContent}>
                                <TouchableOpacity style={styles.sidebarItem}>
                                    <Text style={styles.sidebarItemText}>Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sidebarItem}>
                                    <Text style={styles.sidebarItemText}>Settings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sidebarItem}>
                                    <Text style={styles.sidebarItemText}>Logout</Text>
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
        backgroundColor: '#313234', 
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 9,
        height: 65, 
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
    blurBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingTop: 10,
    },
    postContainer: {
        backgroundColor: '#000000',
        marginTop: 1,
        marginBottom: 1,
        padding: 10,
    },
    actionButton: {
        margin: 5,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        alignItems: 'center',
    },
    postText: {
        fontSize: 16,
        color: 'white',
    },
    postImage: {
        width: '100%',
        height: 200,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingVertical: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: 'white',
        fontSize: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
    },
    sidebarHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    sidebarAvatar: {
        marginBottom: 10,
    },
    sidebarName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sidebarContent: {
        flex: 1,
    },
    sidebarItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sidebarItemText: {
        fontSize: 16,
    },
});

export default Navbar;