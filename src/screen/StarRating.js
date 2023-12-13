// StarRating.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StarRating = ({ rating, onRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map((star) => (
        <TouchableOpacity key={star} onPress={() => onRating(star)}>
          <Text>{star <= rating ? '★' : '☆'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
