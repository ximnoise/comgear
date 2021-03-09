import React from 'react';
import { Component } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View, KeyboardAvoidingView, Image } from 'react-native';
import { GiftedChat, Bubble, SystemMessage, MessageText, InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';

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
      }
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

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }


      this.setState({
        user: {
          _id: user.uid,
          name: name,
          avatar: 'http://placeimg.com/140/140/any'
        },
        messages: []
      });

      this.referenceChatMessages = firebase.firestore().collection('messages');
      this.unsubscribeChatUser = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
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
    }),
      () => {
        this.addMessage();
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
          wrapperStyle={{
            left: {
              borderBottomLeftRadius: 5,
              backgroundColor: '#696969'
            },
            right: {
              borderBottomRightRadius: 5,
              backgroundColor: '#4ca3dd'
            }
          }}
      />
    )
  }

  renderMessageText(props) {
    return (
      <MessageText
        {...props}
        textStyle={{
          left: {
            color: '#fff'
          },
          right: {
            color: '#000'
          }
        }}
        linkStyle={{
          left: {
            color: '#ffff00'
          },
          right: {
            color: '#003366'
          }
        }}
        customTextStyle={{ fontSize: 18 }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
          textStyle={{
            color: '#fff',
            fontWeight: '700'
          }}
      />
    );
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#000',
        }}
        primaryStyle={{ alignItems: 'center' }}
      />
    );
  }

  renderComposer(props) {
    return (
      <Composer
        {...props}
        textInputStyle={{
          color: '#000',
          backgroundColor: '#EDF1F7',
          borderWidth: 1,
          borderRadius: 20,
          borderColor: '#E4E9F2',
          paddingTop: 8.5,
          paddingHorizontal: 12,
          marginLeft: 0,
          marginRight: 10
        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send
        {...props}
        disabled={!props.text}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4,
        }}
      >
        <Image
          style={{ width: 32, height: 32 }}
          source={require('../assets/send-icon-36px.png')}
        />
      </Send>
    );
  }

  renderActions(props) {
    return (
      <Actions
        {...props}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 4,
          marginRight: 4,
          marginBottom: 0,
        }}
        icon={() => (
          <Image
            style={{ width: 32, height: 32 }}
            source={require('../assets/more-icon-36px.png')}
          />
        )}
        options={{
          'Choose From Library': () => {
            console.log('Choose From Library');
          },
          Cancel: () => {
            console.log('Cancel');
          },
        }}
        optionTintColor="#000"
      />
    );
  }

  render() {
    const color = this.props.route.params.bgColor;
    const { name } = this.props.route.params;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: color,
      },
    });

    return (
      <View style={styles.container}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderMessageText={this.renderMessageText.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderComposer={this.renderComposer.bind(this)}
          renderActions={this.renderActions.bind(this)}
          renderSend={this.renderSend.bind(this)}
          renderUsernameOnMessage
          showUserAvatar
          messages={this.state.messages}
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
      </View>
    );
  }
}

export default Chat;