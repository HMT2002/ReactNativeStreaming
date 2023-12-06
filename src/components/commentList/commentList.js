import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { id: Date.now(), text: newComment }]);
            setNewComment('');
        }
    };

    return (
        <View>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={(text) => setNewComment(text)}
            />
            <Button title="Add Comment" onPress={handleAddComment} />
        </View>
    );
}    

export default CommentList;