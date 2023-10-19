/* eslint-disable*/
import React, { useState, useEffect, useContext } from "react";

import OctIcon from "react-native-vector-icons/Octicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import EntIcon from "react-native-vector-icons/Entypo";
import AppContext from "../utils/AppContext";
import AppController from "../controllers/AppController";
import NoteDetails from "../components/notes/NoteDetails";
import Mischellaneous from "../components/tools/Mischellaneous";
import AddURLDialog from "../dialogs/AddURLDialog";
import EditTaskDialog from "../dialogs/EditTaskDialog";

import { View, StyleSheet, ScrollView, Share } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { colorTags } from "../utils/AppColors";

const defaultState = {
  ID: null,
  title: null,
  createdDate: new Date(),
  lastUpdated: new Date(),
  subTitle: null,
  colorTag: colorTags[0],
  image: null,
  content: null,
  url: null,
  tasks: null,
}

const NoteScreen = (props) => {
  const appContext = useContext(AppContext);

  const [note, setNote] = useState(defaultState);
  const [isURLDialogVisible, setIsURLDialogVisible] = useState(false);
  const [editTaskDialog, setEditTaskDialog] = useState({ isVisible: false, index: -1, task: null });

  const SaveNoteHandler = async () => {
    if (note.subTitle == null && note.content == null &&
      note.image == null && note.url == null &&
      (note.tasks == null || note.tasks.length === 0)) {
      appContext.callSnackBar({
        type: "error",
        message: "Please fill in note content",
      });
      return;
    }

    let saveNote = note;

    if (saveNote.title == null || saveNote.title === "") saveNote = { ...saveNote, title: "Untitled" };

    await AppController.SaveNote({
      note: saveNote,
      onSuccess: () => {
        props.navigation.goBack();
        appContext.callSnackBar({
          type: "congrats",
          message: "Save note successfully!"
        });
      },
      onFailed: (response) => {
        console.log(response);
      }
    })
  }

  const DeleteNoteHandler = () => AppController.DeleteNote({
    ID: props.route.params.ID,
    onSuccess: () => {
      props.navigation.goBack();
      appContext.callSnackBar({
        type: "congrats",
        message: "Delete note successfully!"
      });
    },
    onFailed: (error) => console.log(error)
  });

  const ImagePicker = async () => {
    try {
      launchImageLibrary({ storagOptions: { path: 'image' } },
        (response) => {
          if (response.assets != null) {
            NoteImageChangeHandler(response.assets[0]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  const NoteTitleChangeHandler = (value) => setNote(prev => { return { ...prev, title: value } });
  const NoteSubTitleChangeHandler = (value) => setNote(prev => { return { ...prev, subTitle: value } });
  const NoteContentChangeHandler = (value) => setNote(prev => { return { ...prev, content: value, tasks: null } });
  const NoteUrlChangeHandler = (url) => setNote(prev => { return { ...prev, url: url, tasks: null } });
  const NoteImageChangeHandler = (image) => setNote(prev => { return { ...prev, image: image, tasks: null } });
  const NoteColorTagChangeHandler = (tag) => setNote(prev => { return { ...prev, colorTag: tag } });
  const NoteTaskChangeHandler = (value) => setNote(prev => { return { ...prev, image: null, content: null, url: null, tasks: value } });

  const NoteTaskEditHandler = ({ index, toDo }) => {
    let temp = note.tasks;
    if (index != -1) {
      temp[index].toDo = toDo;
      setNote(prev => { return { ...prev, tasks: temp } })
    }
  }

  const ShareNoteHandler = async () => {
    try {
      let shareContent = '#' + note.title;
      shareContent += note.subTitle != null ? '\n' + note.subTitle : "";
      shareContent += note.content != null ? '\n' + note.content : "";
      shareContent += note.url != null ? '\n' + note.url : "";

      //nội dung Share để ở trong message, chỉ để ở dạng string
      const result = await Share.share({
        message: shareContent,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.route.params.isCreateNote == false) {
      AppController.GetNote({
        ID: props.route.params.ID,
        onSuccess: (data) => setNote(data),
        onFailed: (response) => console.log(response)
      })
    }
    else {
      switch (props.route.params.type) {
        case "task":
          setNote(prev => { return { ...prev, tasks: [] } }); break;
        case "image":
          ImagePicker(); break;
        case "url":
          setIsURLDialogVisible(true); break;
      }
    }
  }, []);

  const styles = StyleSheet.create({
    noteScreen: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: appContext.appTheme?.primary,
    },

    noteScreen_header: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: appContext.appTheme?.primary,
      height: 60,
      alignItems: "center",
    },

    noteScreen_icon: {
      backgroundColor: "transparent",
      color: appContext.appTheme?.icon,
      size: 30,
    },

    noteScreen_backIcon: {
      size: 40,
      marginLeft: "3%",
    },

    noteScreen_shareIcon: {
      marginLeft: "auto",
      marginRight: 20,
    },

    noteScreen_saveIcon: {
      marginLeft: 0,
      marginRight: "3%",
    },
  });

  return (
    <View style={styles.noteScreen}>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.noteScreen_header}>
          <MatIcon name="arrow-back-ios"
            {...styles.noteScreen_icon}
            {...styles.noteScreen_backIcon}
            onPress={() => props.navigation.goBack()} />
          <EntIcon name="share"
            {...styles.noteScreen_icon}
            {...styles.noteScreen_shareIcon}
            onPress={ShareNoteHandler}
          />
          <OctIcon name="check-circle"
            {...styles.noteScreen_icon}
            {...styles.noteScreen_saveIcon}
            onPress={SaveNoteHandler} />
        </View>
        <NoteDetails note={note}
          onTitleChange={NoteTitleChangeHandler}
          onSubTitleChange={NoteSubTitleChangeHandler}
          onContentChange={NoteContentChangeHandler}
          onTasksChange={NoteTaskChangeHandler}
          onUrlChange={NoteUrlChangeHandler}
          onImageDelete={NoteImageChangeHandler}
          showEditTaskDialog={setEditTaskDialog} />
      </ScrollView>
      <Mischellaneous
        isCreateNote={props.route.params.isCreateNote}
        onSelectTag={note.colorTag}
        selectTag={NoteColorTagChangeHandler}
        addImage={ImagePicker}
        addUrl={() => setIsURLDialogVisible(true)}
        addTasks={NoteTaskChangeHandler}
        deleteNote={DeleteNoteHandler} />
      <AddURLDialog
        isVisible={isURLDialogVisible}
        setIsVisible={setIsURLDialogVisible}
        onUrlAdded={NoteUrlChangeHandler} />
      <EditTaskDialog
        index={editTaskDialog.index}
        task={editTaskDialog.task}
        isVisible={editTaskDialog.isVisible}
        onTaskEdit={NoteTaskEditHandler}
        setIsVisible={setEditTaskDialog} />
    </View>
  );
}

export default NoteScreen;
