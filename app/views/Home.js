import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            // alert(user.email);
            // if user is logged in, check if they are a tenant or manager
            if(user) {
                // check if user is tenant
                return fetch('https://comp490.000webhostapp.com/public/tenants.php', {
                    method: 'POST',
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: user.email,
                        option: 'check_tenant'
                    })
                })
                .then(response => response.json())
                .then(responseJson => {
                    if(responseJson.success) {
                        this.props.navigation.push('TenantHomeScreen', {
                            email: user.email
                        });
                    }
                    // check if user is manager
                    return fetch('https://comp490.000webhostapp.com/public/managers.php', {
                        method: 'POST',
                        header: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: user.email,
                            option: 'check_manager'
                        })
                    })
                    .then(response => response.json())
                    .then(responseJson => {
                        if(responseJson.success) {
                            this.props.navigation.push('ManagerHomeScreen', {
                                email: user.email
                            });
                        }
                    })
                    .catch(error => console.warn(error));
                })
                .catch(error => console.warn(error));
            }
        });
    }
    // componentDidMount() {
    //     return fetch('http://apartment-app-comp490.com', {
    //         method: 'POST',
    //         header: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             test: 'success'
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(responseJson => console.log(responseJson))
    //         .catch(error => console.error(error));
    // }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={ require('../images/home-page-background-image.jpg') }
                    style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.4 }} />
                    <View style={ styles.buttonContainer }>
                        <TouchableOpacity
                            style={ styles.button }
                            onPress={() => this.props.navigation.navigate('TenantLoginScreen')}>
                            <Text style={ styles.buttonText }>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.button }
                            onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                            <Text style={ styles.buttonText }>REGISTER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.managerButton }
                            onPress={() => this.props.navigation.navigate('ManagerLoginScreen')}>
                            <Text style={ styles.buttonText }>MANAGER</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 9
    },
    button: {
        backgroundColor: '#1d64b4',
        width: 200,
        padding: 20,
        margin: 2,
        borderRadius: 10
    },
    managerButton: {
        backgroundColor: '#128ACC',
        width: 200,
        padding: 20,
        margin: 2,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    }
});