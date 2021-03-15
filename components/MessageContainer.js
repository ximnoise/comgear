import React from 'react';
import { Bubble, SystemMessage, MessageText } from 'react-native-gifted-chat';

const renderBubble = (props) => (
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
);

const renderMessageText = (props) => (
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

const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
      textStyle={{
        color: '#000',
        fontWeight: '700',
      }}
  />
);

export {
  renderBubble,
  renderMessageText,
  renderSystemMessage
};

