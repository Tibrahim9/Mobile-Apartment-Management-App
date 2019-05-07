import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export class ManagerCreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // mobile_number: this.props.navigation.getParam('mobile_number', 0),
            // room_number: this.props.navigation.getParam('room_number', 0),
            first_name: '',
            last_name: '',
            email: '',
            email_error: '',
            password: '',
            confirm_password: '',
            confirm_password_error: '',
            loading: null,
            error: '',
            mobile_number: null,
            mobile_number_error: '',
        }
    }
    createProfile = () => {
        Keyboard.dismiss();
        this.setState({
            loading: true,
            error: ''
        });
        if(this.state.email_error) {
            this.setState({ error: 'Invalid email address!', loading: false });
            return;
        }
        if(this.state.password.length < 6) {
            this.setState({ error: 'Password must be at least 6 characters!', loading: false });
            return;
        }
        if(this.state.password != this.state.confirm_password) {
            this.setState({ error: 'Passwords do not match!', loading: false });
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                return fetch('https://comp490.000webhostapp.com/public/managers.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mobile_number: this.state.mobile_number,
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                        building_id: 1,
                        option: 'add_manager'
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    if(responseJson.success) {
                        this.setState({ loading: false });
                        this.props.navigation.push('ManagerHomeScreen', {
                            email: this.state.email
                        });
                    }
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    console.error(error)
                });
            })
            .catch(() => {
                this.setState({ error: 'Error Creating Profile', loading: false });
            });
    }
    renderButton() {
        if(this.state.loading) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return (
            <View>
                <TouchableOpacity
                    style={ styles.createButtonStyle }
                    onPress={ this.createProfile } >
                    <Text style={ styles.buttonTextStyle }>Create Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ styles.cancelButtonStyle }
                    onPress={ () => this.props.navigation.navigate('HomeScreen') } >
                    <Text style={ styles.buttonTextStyle }>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={ require('../../images/home-page-background-image.jpg') }
                    style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.4 }} />
                <View>
                    <KeyboardAwareScrollView
                        enableOnAndroid
                        scrollEnabled={ true }
                        style={ styles.container }>
                        <View style={ styles.inputContainer }>
                            <Text style={ styles.inputTextStyle }>First Name</Text>
                            <TextInput
                                returnKeyType='next'
                                onSubmitEditing={ () => this.last_name.focus() }
                                blurOnSubmit={ false }
                                style={ styles.inputStyle }
                                underlineColorAndroid='transparent'
                                onChangeText={ (text) => this.setState({ first_name: text }) } />
                        </View>
                        <View style={ styles.inputContainer }>
                            <Text style={ styles.inputTextStyle }>Last Name</Text>
                            <TextInput
                                ref={ input => this.last_name = input }
                                returnKeyType='next'
                                onSubmitEditing={ () => this.email.focus() }
                                blurOnSubmit={ false }
                                style={ styles.inputStyle }
                                underlineColorAndroid='transparent'
                                onChangeText={ (text) => this.setState({ last_name: text }) } />
                        </View>
                        <View style={ styles.inputContainer }>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={ styles.inputTextStyle }>Email</Text>
                                <Text style={{ marginLeft: 8, fontSize: 12, alignSelf: 'center', color: '#f00' }}>{ this.state.email_error }</Text>
                            </View>
                            <TextInput
                                ref={ input => this.email = input }
                                returnKeyType='next'
                                onSubmitEditing={ () => this.mobile_number.focus() }
                                blurOnSubmit={ false }
                                keyboardType='email-address'
                                style={ styles.inputStyle }
                                autoCapitalize='none'
                                underlineColorAndroid='transparent'
                                onChangeText={ (text) => {
                                    let email_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                    if(text.match(email_format))
                                        this.setState({ email: text, email_error: '' });
                                    else
                                        this.setState({ email: text, email_error: 'Invalid email!' })
                                } } />
                        </View>
                        <View style={ styles.inputContainer }>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={ styles.inputTextStyle }>Mobile Number</Text>
                                <Text style={{ marginLeft: 8, fontSize: 12, alignSelf: 'center', color: '#f00' }}>{ this.state.mobile_number_error }</Text>
                            </View>
                            <TextInput
                                ref={ input => this.mobile_number = input }
                                placeholder='e.g. 8005551234'
                                returnKeyType='next'
                                onSubmitEditing={ () => this.password.focus() }
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
                        </View>
                        <View style={ styles.inputContainer }>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={ styles.inputTextStyle }>Password</Text>
                                <Text style={{ marginLeft: 8, fontSize: 12, alignSelf: 'center' }}>* (minimum 6 characters)</Text>
                            </View>
                            <TextInput
                                ref={ input => this.password = input }
                                returnKeyType='next'
                                onSubmitEditing={ () => this.confirm_password.focus() }
                                blurOnSubmit={ false }
                                style={ styles.inputStyle }
                                autoCapitalize='none'
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={ (text) => {
                                    if(text == this.state.confirm_password)
                                        this.setState({ confirm_password_error: '' })
                                    this.setState({ password: text });
                                } } />
                        </View>
                        <View style={ styles.inputContainer }>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={ styles.inputTextStyle }>Confirm Password</Text>
                                <Text style={{ marginLeft: 8, fontSize: 12, alignSelf: 'center', color: '#f00' }}>{ this.state.confirm_password_error }</Text>
                            </View>
                            <TextInput
                                ref={ input => this.confirm_password = input }
                                style={ styles.inputStyle }
                                autoCapitalize='none'
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={ (text) => {
                                    if(text != this.state.password) {
                                        this.setState({ confirm_password: text, confirm_password_error: '* Passwords do not match!' });
                                    }
                                    else {
                                        this.setState({ confirm_password: text, confirm_password_error: '' });
                                    }
                                } } />
                        </View>
                        <Text style={ styles.errorStyle }>{ this.state.error }</Text>
                        { this.renderButton() }
                    </KeyboardAwareScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        padding: 12,
        backgroundColor: 'rgba(239, 239, 239, 0.6)'
    },
    inputContainer: {
        marginBottom: 16
    },
    inputStyle: {
        padding: 4,
        paddingLeft: 8,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 3,
        // marginTop: 4,
        backgroundColor: '#efefef',

    },
    inputTextStyle: {
        fontSize: 16
    },
    createButtonStyle: {
        borderRadius: 5,
        backgroundColor: '#1d64b4',
        margin: 8,
        padding: 8,
        alignSelf: 'stretch'
    },
    cancelButtonStyle: {
        borderRadius: 5,
        backgroundColor: '#f00',
        margin: 8,
        padding: 8,
        alignSelf: 'stretch'
    },
    buttonTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16,
        paddingTop: 8
    }
});