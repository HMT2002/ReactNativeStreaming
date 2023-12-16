import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {commentItem} from '../commentItem/commentItem';
import {Avatar} from 'react-native-elements';
import commentAPIs from '../../apis/comment-apis';
import AuthContext from '../../store/auth-context';
const CommentList = props => {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const authCtx = useContext(AuthContext);
  const handleAddComment = async () => {
    if (authCtx.isStayLoggedIn === false) {
      console.log('User is not signed in yet, cant comment!');
    }
    if (newComment.trim() !== '') {
      const result = await commentAPIs.POSTCommentAction(
        video._id,
        authCtx.token,
        newComment,
      );
      setComments([
        ...comments,
        {
          _id: result._id,
          content: newComment,
          user: {
            username: authCtx.username,
            photo: {link: authCtx.avatar},
          },
        },
      ]);

      setNewComment(prevState => {
        return '';
      });
    }
  };
  useEffect(() => {
    const loadComment = async () => {
      console.log('!!!!!!!!@@@@@@@@@@!!!!!!!!' + props.video._id);
      let comments = await commentAPIs.GETAllCommentByVideoAction(
        props.video._id,
      );
      console.log('############@@@@@@@@@@@@@@@');
      setComments(prevState => {
        return comments;
      });
    };
    console.log('CommentList');

    console.log(props);
    setVideo(props.video);
    loadComment();
  }, [props.video]);
  return (
    <SafeAreaView>
      <ScrollView>
        {comments.map(comment => {
          let commentModel = new commentItem(
            comment.user,
            comment.content,
            comment.user.photo.link,
          );
          return (
            <View style={styles.commentContainer} key={comment._id}>
              <Avatar
                rounded
                source={commentModel.img}
                size="small"
                containerStyle={styles.avatar}
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>
                  {commentModel.user.username}
                </Text>
                <Text style={styles.commentText}>{commentModel.content}</Text>
              </View>
            </View>
          );
        })}
        <View>
          <TextInput
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={text => setNewComment(text)}
          />
          <Button title="Add Comment" onPress={handleAddComment} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 5,
  },
  listWrapper: {
    backgroundColor: '#bd4343',
  },
  button: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  episodes: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  ageRestriction: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  numMovies: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#e50914',
    padding: 5,
    borderRadius: 4,
    margin: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commentsContainer: {
    marginTop: 16,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  commentsScrollView: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    padding: 8,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  avatar: {
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 50,
    left: 0,
    bottom: 0,
    right: 0,
    width: 300,
    height: 500,
  },
});

export default CommentList;
