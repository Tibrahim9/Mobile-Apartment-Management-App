import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';



import {
  StyleSheet,
  Text,
  View,
  Image,
   TextInput,
   TouchableHighlight,
    Button,
  TouchableOpacity
} from 'react-native';

const options = {
title: 'Edit Profile Picture',
takePhotoButtonTitle: 'Take Photo with Camera',
ChoosefromGalleryTitle: 'Choose from Photo Library',
}
export default class UserProfileView extends Component {
constructor(props) {
  super(props);
  this.state = {text: ''};
   this.state = {email: ''};
   this.state = {phone: ''};
   this.state = {address: ''};
   this.state = {name: ''};
   this.state = {avatarSource: 'https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg' };
   this.state={source:null};





}
 buttonClickListener = () =>{
      const { address }  = this.state ;
      const { phone }  = this.state ;
	const { email }  = this.state ;

  }

callFun = () =>
  {


ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);
   if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };



      this.setState({
        avatarSource: source,
      });
    }
  });
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
           <TouchableOpacity activeOpacity = { .5 } onPress={ this.callFun }>
<Image style={styles.avatar} source={this.state.avatarSource}/>
 </TouchableOpacity>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text
              style={styles.name}>
               Name </Text>

              <Text style={styles.info}>Tenant</Text>



 <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/metro/26/000000/building.png'}}/>
                        <TextInput style={styles.buttonContainer}
                            placeholder="Address"
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={(address) => this.setState({address})}/>
                      </View>

              		<View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/metro/26/000000/secured-letter.png'}}/>
                        <TextInput style={styles.buttonContainer}
                            placeholder="Email"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => 	this.setState({email})}/>
					</View>

<View style={ styles.bottomView} >





</View>





<View style={styles.inputContainer}>
                                              <Image style={styles.inputIcon}
 source={{uri:'https://img.icons8.com/metro/26/000000/phone.png'}}/>
                                              <TextInput style={styles.buttonContainer}
                                                  placeholder="Phone"
                                                  keyboardType="phone-pad"
                                                  underlineColorAndroid='transparent'
                                                  onChangeText={(phone) => this.setState({phone})}/>
                                            </View>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:0,

top: -65,
    alignSelf:'center',


  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bottomView:{

        width: '100%',
        height: 50,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -350
      },
      topRightView:{

              width: '100%',
              height: 50,
              right: 30,
              backgroundColor: '#00BFFF',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: -350
            },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600",
    top:-120,

  },
buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    left:-45,
    fontWeight: "bold",

    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  info:{
    fontSize:16,
    color: "#0000ff",
    marginTop:5,
    top:-120,
  },
  description:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10,
    textAlign: 'center'
  },
  inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1 },
        inputContainer: {
              borderBottomColor: '#F5FCFF',
              backgroundColor: '#FFFFFF',
              borderRadius:30,
              borderBottomWidth: 1,
              width:250,
              height:65,
top:-90,
              marginBottom:10,
              flexDirection: 'row',
              alignItems:'center'

          },
           inputIcon:{
              width:30,
              height:30,
              marginLeft:15,
               left:-50,
               top:-5,
              justifyContent: 'center'
            },
saveButton: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    width:70,
    flex:1,
    alignSelf: 'flex-end',
    backgroundColor: '#00BFFF',
    borderRadius:30,
  },
  buttonStyle: {
    marginTop:10,
    height:40,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: '#00BFFF',
  },

});
 
