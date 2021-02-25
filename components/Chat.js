import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

const Chat = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${props.route.params.bgColor}`
    },
  });

  return (
    <View style={styles.container}>
      <Text>Hello {props.route.params.name}</Text>
    </View>
  );
}

export default Chat;

