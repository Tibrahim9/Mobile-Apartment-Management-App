import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';

export class TenantHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenant_id: 0,
            email: this.props.navigation.getParam('email', ''),
            first_name: '',
            last_name: '',
            mobile_number: 0,
            room_number: 0,
            building_id: 0
        };
        
    }
    componentWillMount() {
        // alert(this.state.email);
        return fetch('https://comp490.000webhostapp.com/public/tenants.php', {
        // return fetch('http://apartment-app-comp490.com/public/tenants.php', {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                option: 'get_tenant_info'
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(!responseJson.success)
                console.log(responseJson.message)
            console.log(responseJson);
            this.setState({
                tenant_id: responseJson.tenant_info[0],
                first_name: responseJson.tenant_info[1],
                last_name: responseJson.tenant_info[2],
                mobile_number: responseJson.tenant_info[3],
                room_number: responseJson.tenant_info[4],
                building_id: responseJson.tenant_info[5]
            });
        })
        .catch(error => console.warn(error));
    }
    renderButton = () => {
        
    }
    render() {
        return (
            <View style={ styles.container }>
                {/* <Image
                    source={ require('../images/tenant-home-background-image.jpg') }
                    style={ styles.mainImage } /> */}
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={ styles.titleTextStyle }>Hello { this.state.first_name }!</Text>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('MaintenanceScreen', {
                            tenant_id: this.state.tenant_id,
                            email: this.state.email,
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            mobile_number: this.state.mobile_number,
                            room_number: this.state.room_number,
                            building_id: this.state.building_id
                        }) }
                        style={{ alignSelf: 'center', marginRight: 16 }}>
                        <Image
                            source={ require('../../images/user-icon.png') } />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 6 }}>
                    <View style={ styles.boxStyle }>
                        <TouchableOpacity
                            style={ styles.selectionStyle }
                            onPress={ () => this.props.navigation.push('MaintenanceScreen', {
                                tenant_id: this.state.tenant_id,
                                email: this.state.email,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                mobile_number: this.state.mobile_number,
                                room_number: this.state.room_number,
                                building_id: this.state.building_id
                            }) } >
                            <Text style={{
                                alignSelf: 'stretch',
                                fontSize: 20,
                                padding: 4,
                                backgroundColor: '#FFF',
                                textAlign: 'center',
                                color: '#fff',
                                backgroundColor: '#E7DB0F',
                                borderTopLeftRadius: 7,
                                borderTopRightRadius: 7
                            }}>Maintenance</Text>
                            <View style={{ height: '100%', width: '100%' }}>
                                <Image
                                    source={ require('../../images/maintenance-image.jpg') }
                                    style={ styles.selectionImage } />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.selectionStyle }
                            onPress={ () => this.props.navigation.push('PaymentScreen', {
                                tenant_id: this.state.tenant_id,
                                email: this.state.email,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                mobile_number: this.state.mobile_number,
                                room_number: this.state.room_number,
                                building_id: this.state.building_id
                            }) } >
                            <Text style={{
                                alignSelf: 'stretch',
                                fontSize: 20,
                                padding: 4,
                                backgroundColor: '#FFF',
                                textAlign: 'center',
                                color: '#fff',
                                backgroundColor: '#3FA3B2',
                                borderTopLeftRadius: 7,
                                borderTopRightRadius: 7
                            }}>Payment</Text>
                            <View style={{ height: '100%', width: '100%' }}>
                                <Image
                                    source={ require('../../images/payment-image.png') }
                                    style={ styles.selectionImage } />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.boxStyle }>
                        <TouchableOpacity
                            style={ styles.selectionStyle }
                            onPress={ () => {alert("pressed")} } >
                            <Text style={{
                                alignSelf: 'stretch',
                                fontSize: 20,
                                padding: 4,
                                backgroundColor: '#FFF',
                                textAlign: 'center',
                                color: '#fff',
                                backgroundColor: '#3796E3',
                                borderTopLeftRadius: 7,
                                borderTopRightRadius: 7
                            }}>Chat</Text>
                            <View style={{ height: '100%', width: '100%' }}>
                                <Image
                                    source={ require('../../images/chat-image.jpg') }
                                    style={ styles.selectionImage } />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.selectionStyle }
                            onPress={ () => this.props.navigation.push('InformationScreen', {
                                tenant_id: this.state.tenant_id,
                                email: this.state.email,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                mobile_number: this.state.mobile_number,
                                room_number: this.state.room_number,
                                building_id: this.state.building_id
                            }) } >
                            <Text style={{
                                alignSelf: 'stretch',
                                fontSize: 20,
                                padding: 4,
                                backgroundColor: '#FFF',
                                textAlign: 'center',
                                color: '#fff',
                                backgroundColor: '#D54545',
                                borderTopLeftRadius: 7,
                                borderTopRightRadius: 7
                            }}>Information</Text>
                            <View style={{ height: '100%', width: '100%' }}>
                                <Image
                                    source={ require('../../images/info-image.jpg') }
                                    style={ styles.selectionImage } />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ styles.buttonContainer }>
                    <TouchableOpacity
                        style={ styles.buttonStyle }
                        onPress={ () => firebase.auth().signOut().then(() => { this.props.navigation.navigate('HomeScreen') }) } >
                        <Text style={ styles.buttonTextStyle }>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            marginBottom: 8
                        }}
                        onPress={ () => this.props.navigation.push('MaintenanceRequestListScreen', {
                            email: this.state.email
                        }) } >
                        <Text style={ styles.buttonTextStyle }>Manager Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    selectionStyle: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#aaa',
        margin: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    mainImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.4
    },
    selectionImage: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    selectionTextStyle: {
        alignSelf: 'stretch',
        fontSize: 20,
        padding: 4,
        backgroundColor: '#FFF',
        textAlign: 'center'
    },
    titleTextStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        padding: 12,
        marginLeft: 8,
        fontSize: 24,
        flexGrow: 1
    },
    buttonContainer: {
        margin: 8,
        flex: 3,
        justifyContent: 'flex-end'
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: '#1d64b4',
        marginBottom: 8,
        // alignSelf: 'stretch'
    },
    buttonTextStyle: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10
    }
});
