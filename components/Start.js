import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';


const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#fff');

  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover'
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    appTitle: {
      top: 100,
      height: '50%',
      fontSize: 45,
      fontWeight: 600,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFFFFF',
    },
    box: {
      width: '88%',
      height: 300,
      bottom: 100,
      marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      borderRadius: 10
    },
    userNameContainer: {
      flexDirection: 'row',
      position: 'relative',
      margin: 20,
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '88%',
      borderColor: '#757083',
      borderWidth: 2,
      borderRadius: 3,
      padding: 10,
    },
    nameIcon: {
      fontSize: 10,
      paddingRight: 5,
      color: '#757083',
      opacity: 0.2,
    },
    textInput: {
      fontSize: 16,
      width: '100%',
      fontWeight: '300',
      opacity: 50,
      color: '#757083',
    },
    bgColorContainer: {
      flexDirection: 'column'
    },
    bgColorText: {
      fontSize: 16,
      fontWeight: '300',
      opacity: 50,
      color: '#757083',
      marginLeft: 22
    },
    bgColorButtonContainer: {
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    bgColor1: {
      backgroundColor: '#090C08',
      width: 50,
      height: 50,
      borderRadius: 100 / 2
    },
    bgColor2: {
      backgroundColor: '#474056',
      width: 50,
      height: 50,
      borderRadius: 100 / 2
    },
    bgColor3: {
      backgroundColor: '#8A95A5',
      width: 50,
      height: 50,
      borderRadius: 100 / 2
    },
    bgColor4: {
      backgroundColor: '#B9C6AE',
      width: 50,
      height: 50,
      borderRadius: 100 / 2
    },
    chatButton: {
      margin: 20,
      fontSize: 16,
      fontWeight: '600',
      backgroundColor: '#757083',
      width: '88%',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 15
    },
    chatButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 16,
      textAlign: 'center'
    },
    footerContainer: {
      height: 50,
      top: -100
    },
    footerText: {
      marginTop: 10,
      textAlign: 'center'
    },
  });

  // Event Handler (when user clicks 'Start Chatting')
  const onPressChat = (name, bgColor) => {
    if (name === '') {
      return Alert.alert('Please enter your name to continue.');
    }
    navigation.navigate('Chat', {
      name: `${name}`,
      bgColor: `${bgColor}`
    });
  };

  return (
    <ImageBackground source={require('../assets/image/bg-image.jpg')} style={styles.image}>
      <Text style={styles.appTitle}>Comgear</Text>
      <View style={styles.box}>
        <View style={styles.userNameContainer}>
          <Icon
            style={styles.nameIcon}
            name='person-outline'
            color='#000'
            size={25}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => setName(name)}
            defaultValue={name}
            placeholder='Your Name'
          />
        </View>
        <View style={styles.bgColorContainer}>
          <Text style={styles.bgColorText}>Choose Background Color:</Text>
          <View style={styles.bgColorButtonContainer}>
            <TouchableOpacity
              style={styles.bgColor1}
              onPress={() => setBgColor('#090C08')}
            >
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bgColor2}
              onPress={() => setBgColor('#474056')}
            >
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bgColor3}
              onPress={() => setBgColor('#8A95A5')}
            >
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bgColor4}
              onPress={() => setBgColor('#B9C6AE')}
            >
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => onPressChat(name, bgColor)}
        >
          <Text style={styles.chatButtonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Made with ♥️ in Berlin</Text>
      </View>
    </ImageBackground>
  );
};

export default Start;
