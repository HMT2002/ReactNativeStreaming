import React from 'react';
import { View, Text, Image, StyleSheet,ScrollView  } from 'react-native';

const movies = [
  {
    id: 1,
    title: 'Movie 1',
    releaseDate: 'October 2023',
    image: require('../imagePoster/local/banner1.png'),
    description: 'This is the description for Movie 1.',
  },
  {
    id: 2,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 3,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 4,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 5,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 6,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 7,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  // Add more movies here
];

function MovieScreen() {
  return (
    <ScrollView style={styles.container}>
      {movies.map((movie) => (
        <View key={movie.id} style={styles.movieContainer}>
          <Image source={movie.image} style={styles.movieImage} />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieReleaseDate}>Release Date: {movie.releaseDate}</Text>
            <Text style={styles.movieDescription}>{movie.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieReleaseDate: {
    fontSize: 14,
    marginBottom: 8,
  },
  movieDescription: {
    fontSize: 14,
  },
});

export default MovieScreen;