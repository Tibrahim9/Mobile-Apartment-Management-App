import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Keyboard } from 'react-native';
import firebase from 'firebase';

export class ManagerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.push('ManagerHomeScreen', {
                    email: this.state.email
                });
            }
                // this.setState({ loggedIn: false });
        });
    }
    onLoginPress = () => {
        Keyboard.dismiss();
        this.setState({
            error: '',
            loading: true
        });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { this.setState({ loading: false }); })
            .catch(() => { this.setState({ error: 'Invalid Email and/or Password', loading: false }); });
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
                    style={ styles.loginButtonStyle }
                    onPress={ this.onLoginPress } >
                    <Text style={ styles.loginButtonTextStyle }>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ styles.cancelButtonStyle }
                    onPress={ () => { Keyboard.dismiss(); this.props.navigation.push('HomeScreen'); } } >
                    <Text style={ styles.cancelButtonTextStyle }>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={ require('../../images/home-page-background-image.jpg') }
                    style={ styles.image } />
                {/* <Header /> */}
                <View style={ styles.formContainer }>
                    <View style={ styles.inputContainer }>
                        <Text>Email</Text>
                        <TextInput
                            returnKeyType='next'
                            onSubmitEditing={ () => this.password.focus() }
                            blurOnSubmit={ false }
                            style={ styles.inputStyle }
                            keyboardType='email-address'
                            autoCapitalize='none'
                            underlineColorAndroid='transparent'
                            onChangeText={ text => { this.setState({ email: text }); } } />
                    </View>
                    <View style={ styles.inputContainer }>
                        <Text>Password</Text>
                        <TextInput
                            returnKeyType='go'
                            ref={ input => this.password = input }
                            style={ styles.inputStyle }
                            secureTextEntry={true}
                            autoCapitalize='none'
                            underlineColorAndroid='transparent'
                            onChangeText={ text => { this.setState({ password: text }); } }
                            onSubmitEditing={ this.onLoginPress } />
                    </View>
                    <Text style={ styles.errorStyle }>{ this.state.error }</Text>
                    <View style={ styles.buttonContainer }>
                        { this.renderButton() }
                    </View>
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
    formContainer: {
        backgroundColor: 'rgba(239, 239, 239, 0.6)',
        margin: 8,
        marginTop: 16,
        padding: 8,
        borderRadius: 4
    },
    inputContainer: {
        padding: 8
    },
    inputStyle: {
        padding: 4,
        paddingLeft: 8,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 3,
        marginTop: 4,
        backgroundColor: '#efefef',
    },
    buttonContainer: {
        marginTop: 8
    },
    loginButtonStyle: {
        borderRadius: 5,
        backgroundColor: '#1d64b4',
        marginBottom: 8,
        alignSelf: 'stretch'
    },
    cancelButtonStyle: {
        borderRadius: 5,
        backgroundColor: 'red',
        alignSelf: 'stretch'
    },
    loginButtonTextStyle: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10
    },
    cancelButtonTextStyle: {
        alignSelf: 'center',
        fontSize: 16,
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

