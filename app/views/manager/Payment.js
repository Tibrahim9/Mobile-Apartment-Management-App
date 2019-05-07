import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export class ManagerPayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manager_id: this.props.navigation.getParam('manager_id', ''),
            email: this.props.navigation.getParam('email', ''),
            first_name: this.props.navigation.getParam('first_name', ''),
            last_name: this.props.navigation.getParam('last_name', ''),
            mobile_number: this.props.navigation.getParam('mobile_number', ''),
            building_id: this.props.navigation.getParam('building_id', '')
        }
    }
    render() {
        return (
            <View style={ styles.container }>
                <Image
                    source={ require('../../images/payment-image.png') }
                    style={ styles.image } />
                <View style={ styles.optionView }>
                    <TouchableOpacity
                        style={ styles.buttonStyle }
                        onPress={ () => {
                            this.props.navigation.push('PaymentRequestScreen', {
                                manager_id: this.state.manager_id,
                                email: this.state.email,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                mobile_number: this.state.mobile_number,
                                building_id: this.state.building_id
                            });
                        }
                            }>
                        <Text style={ styles.buttonTextStyle }>Request a Payment</Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.optionView }>
                    <TouchableOpacity
                        style={ styles.buttonStyle }
                        onPress={ () => {
                            this.props.navigation.push('PaymentEditScreen', {
                                manager_id: this.state.manager_id,
                                email: this.state.email,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                mobile_number: this.state.mobile_number,
                                building_id: this.state.building_id
                            });
                        }
                            }>
                        <Text style={ styles.buttonTextStyle }>Edit Payment</Text>
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
        width: '90%',
        height: '90%',
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