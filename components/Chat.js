import React, { Component } from 'react';
import { StyleSheet, Platform, View, KeyboardAvoidingView, Image, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';

import { renderBubble, renderMessageText, renderSystemMessage } from './MessageContainer';
import { renderInputToolbar, renderComposer, renderSend, renderActions } from './InputToolbar';

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

const firebase = require('firebase');
require('firebase/firestore');

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyD27yr7Jqqf_AUuORcsWfjKJeEJNy4L6ww",
      authDomain: "comgear.firebaseapp.com",
      projectId: "comgear",
      storageBucket: "comgear.appspot.com",
      messagingSenderId: "81764134835",
      appId: "1:81764134835:web:0e333b14e4294cba2ea5c6",
      measurementId: "G-JE88LWBXJK"
    };

    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");
  };

  componentDidMount() {
    const name = this.props.route.params.name;

    // Check user connection
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true
        });

        // Reference to load messages via Firebase
        this.referenceChatMessages = firebase
          .firestore()
          .collection('messages');

        // Authenticates user via Firebase
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          // Add user to state
          this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              name: name,
              avatar: 'http://placeimg.com/140/140/any'
            },
            messages: []
          });
          // Listener for collection changes for current user
          this.unsubscribeChatUser = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);
        });
        console.log('online');
      } else {
        this.setState({
          isConnected: false
        });
        this.getMessage();
        Alert.alert('No internet connection, unable to send messages');
        console.log('offline');
      }
    });
  }

  componentWillUnmount() {
    // Stops listening for authentication
    this.unsubscribeChatUser;
    // Stops listening for changes
    this.authUnsubscribe;
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || null,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        }
      });
    });
    this.setState({ messages });
  }

  // Retrieve messages from client-side storage
  async getMessage() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Saves messages in client-side storage
  async saveMessage() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message)
    }
  }

  // Delete messages in client-side storage
  async deleteMessage() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Adds messages to cloud storage
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessage();
      this.saveMessage();
    });
  }

  render() {
    const color = this.props.route.params.bgColor;
    const { name } = this.props.route.params;
    const { navigate } = this.props.navigation;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: color,
      },
      box: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: '#474056',
        borderColor: '#000',
        borderBottomWidth: 1,
      },
      nameText: {
        top: 55,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
      },
      userAvatar: {
        top: 50,
        right: 20
      },
      backBtn: {
        top: 50,
        left: 20
      },
      bottomColorOverride: {
        backgroundColor: '#474056',
        height: 35
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigate('Start')}>
            <Image source={require('../assets/back-icon-36px.png')} />
          </TouchableOpacity>
          <Text style={styles.nameText}>{name}</Text>
          <TouchableOpacity style={styles.userAvatar} onPress={() => Alert.alert('Please add a photo')}>
            <Image source={require('../assets/add-photo-icon-36px.png')} />
          </TouchableOpacity>
        </View>
        <GiftedChat
          renderBubble={renderBubble}
          renderSystemMessage={renderSystemMessage}
          renderMessageText={renderMessageText}
          renderInputToolbar={renderInputToolbar}
          renderComposer={renderComposer}
          renderActions={renderActions}
          renderSend={renderSend}
          placeholder={this.state.isConnected ? 'Type a message...' : 'No internet connection'}
          maxInputLength={this.state.isConnected ? 1000 : 0}
          renderUsernameOnMessage
          showUserAvatar
          messages={this.state.messages}
          isConnected={this.state.isConnected}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            avatar: this.state.user.avatar,
            name: name,
          }}
        />
        {
          Platform.OS === 'android' ? (
            <KeyboardAvoidingView behavior='height' />
          ) : null
        }
        <View style={styles.bottomColorOverride}></View>
      </View>
    );
  }
}

export default Chat;