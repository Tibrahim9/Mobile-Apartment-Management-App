import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export class Maintenance extends React.Component {
    static navigationOptions = {
        headerRight: (
            <TouchableOpacity
              onPress={ this.goHome } >
              <Image
                style={{ marginRight: 8 }}
                source={ require('../../images/home_icon.png') } />
            </TouchableOpacity>
          )
    };
    constructor(props) {
        super(props);
        this.state = {
            tenant_id: this.props.navigation.getParam('tenant_id', ''),
            email: this.props.navigation.getParam('email', ''),
            first_name: this.props.navigation.getParam('first_name', ''),
            last_name: this.props.navigation.getParam('last_name', ''),
            mobile_number: this.props.navigation.getParam('mobile_number', ''),
            room_number: this.props.navigation.getParam('room_number', ''),
            building_id: this.props.navigation.getParam('building_id', '')
        }
    }
    goHome = () => {
        alert('test');
        // return this.props.navigation.push('TenantHomeScreen', { email: this.state.email });
    }
    render() {
        return (
            <View style={ styles.container }>
                <Image
                    source={ require('../../images/maintenance-image.jpg') }
                    style={ styles.image } />
                <View style={ styles.optionView }>
                    <TouchableOpacity
                        style={ styles.buttonStyle }
                        onPress={ () => {
                            this.props.navigation.push('MaintenanceRequestScreen', {
                                tenant_id: this.state.tenant_id,
                                email: this.state.email,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                mobile_number: this.state.mobile_number,
                                room_number: this.state.room_number,
                                building_id: this.state.building_id
                            });
                        }
                            }>
                        <Text style={ styles.buttonTextStyle }>Submit Request</Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.optionView }>
                    <TouchableOpacity
                        style={ styles.buttonStyle }
                        onPress={ () => {
                            this.props.navigation.push('MaintenanceRequestViewScreen', {
                                tenant_id: this.state.tenant_id,
                                email: this.state.email,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                mobile_number: this.state.mobile_number,
                                room_number: this.state.room_number,
                                building_id: this.state.building_id
                            });
                        }
                            }>
                        <Text style={ styles.buttonTextStyle }>View Requests</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 6 }}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.4
    },
    container: {
        flex: 1
    },
    optionView: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: '#1d64b4',
        margin: 4,
        marginBottom: 8
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