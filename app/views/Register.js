import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile_number: null,
            mobile_number_error: '',
            room_number: null,
            token: '',
            switch: false
        };
    }
    renderForm = () => {
        if(!this.state.switch) {
            return (
                <View>
                    <View style={ styles.keyContainer }>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={ styles.keyText }>Mobile Number</Text>
                            <Text style={{ marginLeft: 8, fontSize: 12, alignSelf: 'center', color: '#f00' }}>{ this.state.mobile_number_error }</Text>
                        </View>
                        <TextInput
                            placeholder='e.g. 8005551234'
                            returnKeyType='next'
                            onSubmitEditing={ () => this.room_number.focus() }
                            blurOnSubmit={ false }
                            textContentType='telephoneNumber'
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            autoCorrect={ false }
                            onChangeText={ text => {
                                let mobile_number_format = /^\d{10,11}$/;
                                if(text.match(mobile_number_format))
                                    this.setState({ mobile_number: text, mobile_number_error: '' });
                                else
                                    this.setState({ mobile_number: text, mobile_number_error: 'Invalid mobile number' });
                            } }
                            style={ styles.inputStyle } />
                        <Text style={ styles.keyText }>Room Number:</Text>
                        <TextInput
                            ref={ input => this.room_number = input }
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            autoCorrect={ false }
                            onChangeText={ text => this.setState({ room_number: text }) }
                            style={ styles.inputStyle } />
                    </View>
                    <TouchableOpacity
                        style={ styles.buttonStyle }
                        onPress={ () => this.setState({ switch: true }) } >
                        <Text style={ styles.buttonTextStyle }>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.cancelButtonStyle }
                        onPress={ () => { Keyboard.dismiss(); this.props.navigation.navigate('HomeScreen'); } } >
                        <Text style={ styles.buttonTextStyle }>Cancel</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View>
                <View style={ styles.keyContainer }>
                    <Text style={ styles.keyText }>Enter Key:</Text>
                    <TextInput
                        value={ this.state.token }
                        autoCorrect={ false }
                        keyboardType='numeric'
                        underlineColorAndroid='transparent'
                        style={ styles.inputStyle }
                        onChangeText={(text) => this.setState({ token: text })} />
                </View>
                <TouchableOpacity
                    style={ styles.buttonStyle }
                    onPress={ () => { Keyboard.dismiss(); this.props.navigation.navigate('CreateProfileScreen', { mobile_number: this.state.mobile_number, room_number: this.state.room_number }) } } >
                    <Text style={ styles.buttonTextStyle }>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ styles.cancelButtonStyle }
                    onPress={ () => { Keyboard.dismiss(); this.props.navigation.navigate('HomeScreen'); } } >
                    <Text style={ styles.buttonTextStyle }>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={ require('../images/home-page-background-image.jpg') }
                    style={ styles.image } />
                { this.renderForm() }

                {/* <View style={ styles.keyContainer }>
                    <Text style={ styles.keyText }>Enter Mobile Number:</Text>
                    <TextInput
                        textContentType='telephoneNumber'
                        keyboardType='numeric'
                        underlineColorAndroid='transparent'
                        autoCorrect={ false }
                        style={ styles.inputStyle } />
                    <Text style={ styles.keyText }>Enter Key:</Text>
                    <TextInput
                        autoCorrect={ false }
                        keyboardType='numeric'
                        underlineColorAndroid='transparent'
                        style={ styles.inputStyle } />
                </View>
                <TouchableOpacity
                    style={ styles.buttonStyle }
                    onPress={ () => this.props.navigation.navigate('CreateProfileScreen', { mobile_number: this.state.mobile_number }) } >
                    <Text style={ styles.buttonTextStyle }>Register</Text>
                </TouchableOpacity> */}

                <View style={ styles.textContainer }>
                    <Text style={{ fontSize: 16 }}>Already have an account?</Text>
                    <Text
                        style={{ fontSize: 16, color: '#113c6c', fontWeight: '700' }}
                        onPress={ () => this.props.navigation.navigate('LoginScreen') }>Click Here to Login</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.4
    },
    inputStyle: {
        padding: 4,
        paddingLeft: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 3,
        marginTop: 4,
        backgroundColor: '#efefef',
    },
    keyContainer: {
        backgroundColor: 'rgba(239, 239, 239, 0.8)',
        margin: 16,
        marginTop: 32,
        padding: 16,
        borderRadius: 4
    },
    keyText: {
        fontSize: 16,
        marginBottom: 4
    },
    textContainer: {
        alignItems: 'center',
        // alignSelf: 'center',
        marginTop: 40
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: '#1d64b4',
        marginBottom: 8,
        // alignSelf: 'stretch'
        margin: 16,
        marginTop: 0
    },
    cancelButtonStyle: {
        borderRadius: 5,
        backgroundColor: '#f00',
        marginBottom: 8,
        // alignSelf: 'stretch'
        margin: 16,
        marginTop: 0
    },
    buttonTextStyle: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10
    },
});
