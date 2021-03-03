import React from 'react';
import { Component } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, View, KeyboardAvoidingView, Image} from 'react-native';
import { GiftedChat, Bubble, SystemMessage, MessageText, InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';

class Chat extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const name = this.props.route.params.name;

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          },
        },
        {
          _id: 2,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
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
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
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