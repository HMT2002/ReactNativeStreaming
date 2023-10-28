import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
   
        <TextInput
          placeholder="Search for movies..."
          style={styles.searchInput}
          placeholderTextColor="gray"
        />
      </View>
      <Text style={styles.recentSearches}>Recent Searches:</Text>
      <View style={styles.recentSearchesContainer}>
        <Text style={styles.recentSearch}>Action</Text>
        <Text style={styles.recentSearch}>Comedy</Text>
        <Text style={styles.recentSearch}>Drama</Text>
        <Text style={styles.recentSearch}>Thriller</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  recentSearches: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recentSearch: {
    backgroundColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    color: 'white',
  },
});

export default SearchScreen;
