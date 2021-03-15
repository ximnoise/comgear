import React from 'react';
import { Image } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';

const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: '#474056',
      borderTopColor: '#000',
      borderTopWidth: 1,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);

const renderComposer = (props) => (
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

const renderSend = (props) => (
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

const renderActions = (props) => (
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
        style={{ width: 36, height: 36 }}
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

export {
  renderInputToolbar,
  renderComposer,
  renderSend,
  renderActions
};



