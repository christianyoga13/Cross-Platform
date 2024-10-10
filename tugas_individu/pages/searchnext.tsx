import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SearchNext = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>(['Recent 1', 'Recent 2', 'Recent 3']);
    const navigation = useNavigation();

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setSuggestions(query ? ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'] : []);
    };

    const handleCancel = () => {
        navigation.navigate('search' as never); 
    };

    const handleRecentSearchPress = (query: string) => {
        setSearchQuery(query);
        setSuggestions(['Suggestion 1', 'Suggestion 2', 'Suggestion 3']); 
    };

    const renderRecentSearches = () => (
        <View style={styles.recentSearchesContainer}>
            <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
            <FlatList
                data={recentSearches}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <List.Item
                        title={item}
                        titleStyle={styles.listItemText} 
                        onPress={() => handleRecentSearchPress(item)}
                        left={() => <List.Icon icon="history" />}
                    />
                )}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={handleSearchChange}
                    value={searchQuery}
                    style={styles.searchbar}
                    inputStyle={styles.searchbarInput} 
                />
                <TouchableOpacity onPress={handleCancel}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {searchQuery === '' ? renderRecentSearches() : (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item}
                            titleStyle={styles.listItemText} 
                            left={() => <List.Icon icon="magnify" />}
                        />
                    )}
                    style={styles.suggestionsList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000000',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchbar: {
        flex: 1,
        marginRight: 8,
        height: 40, 
        justifyContent: 'center', 
        backgroundColor: 'gray', 
    },
    searchbarInput: {
        textAlignVertical: 'center', 
        paddingVertical: 0, 
        paddingBottom: 15,
    },
    suggestionsList: {
        marginTop: 16,
    },
    recentSearchesContainer: {
        marginTop: 16,
    },
    recentSearchesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white', 
    },
    listItemText: {
        color: 'white', 
    },
    cancelText: {
        color: 'white', 
        fontSize: 16,
    },
});

export default SearchNext;