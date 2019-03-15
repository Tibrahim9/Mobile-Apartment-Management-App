import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

payments = [];
payments[0] = [123.45, 'Maintenance', '12/31/18', 3];
payments[1] = [1200.00, 'Rent', '02/01/19', 2];
payments[2] = [45.00, 'Ticket', '01/14/19', 1];

export class PaymentHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tenant_id: this.props.navigation.getParam('tenant_id', 0),
            email: this.props.navigation.getParam('email', ''),
            first_name: this.props.navigation.getParam('first_name', ''),
            last_name: this.props.navigation.getParam('last_name', ''),
            mobile_number: this.props.navigation.getParam('mobile_number', 0),
            room_number: this.props.navigation.getParam('room_number', 0),
            building_id: this.props.navigation.getParam('building_id', 0),
            viewLoading: false,
            showStatus: false,
            statusIndex: 0
        }
    }
    componentWillMount() {
        this.setState({
            viewLoading: true
        });
        setTimeout(() => { this.setState({ viewLoading: false }); }, 2000);
    }
    showStatus = (index) => {
        if(this.state.statusIndex == index) {
            this.setState({
                showStatus: !this.state.showStatus
            });
        }
        else {
            this.setState({
                showStatus: true,
                statusIndex: index
            });
        }
    }
    renderPaymentHistory = () => {
        if(this.state.viewLoading) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return payments.map((payment, index) => {
            switch(payment[3]){
                case 1:
                    status = 'Submitted';
                    break;
                case 2:
                    status = 'Pending';
                    break;
                case 3:
                    status = 'Completed';
                    break;
            }
            if(index % 2 == 0)
                backgroundColor = '#eee';
            else
                backgroundColor = '#fff';
            return (
                <View key={index}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', backgroundColor: backgroundColor }}
                        onPress={ () => this.showStatus(index) }>
                        <Text style={{
                            flex: 2,
                            paddingTop: 8,
                            paddingBottom: 8,
                            marginLeft: 12
                        }}>${ payment[0].toFixed(2) }</Text>
                        <Text style={{
                            flex: 3,
                            paddingTop: 8,
                            paddingBottom: 8,
                            marginLeft: 12
                        }}>{ payment[1] }</Text>
                        <Text style={{
                            flex: 2,
                            paddingTop: 8,
                            paddingBottom: 8,
                            marginLeft: 12
                        }}>{ payment[2] }</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: backgroundColor }}>
                        {
                            this.state.showStatus && index == this.state.statusIndex ?
                            <Text style={{
                                paddingTop: 8,
                                paddingBottom: 8,
                                marginLeft: 12
                            }}>Status: { status }</Text>
                            :
                            null
                        }
                    </View>
                </View>
            );
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={ styles.paymentViewContainer }>
                    <Text style={ styles.headerText }>Payment History</Text>
                    <View style={ styles.paymentViewTitles }>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Amount</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Description</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Date</Text>
                    </View>
                    <View style={ styles.dataContainer }>
                        <ScrollView>
                            { this.renderPaymentHistory() }
                        </ScrollView>
                    </View>
                </View>
                <View style={ styles.buttonContainer }>
                    <TouchableOpacity
                        style={ styles.buttonStyle }
                        onPress={ () => this.props.navigation.push('TenantHomeScreen', {
                            tenant_id: this.state.tenant_id,
                            email: this.state.email,
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            mobile_number: this.state.mobile_number,
                            room_number: this.state.room_number
                        }) }>
                        <Text style={ styles.buttonTextStyle }>Make New Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                            borderRadius: 5,
                            backgroundColor: '#238C9B',
                            marginBottom: 8,
                            alignSelf: 'stretch'
                        }}
                        onPress={ () => this.props.navigation.push('PaymentScreen', {
                            tenant_id: this.state.tenant_id,
                            email: this.state.email,
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            mobile_number: this.state.mobile_number,
                            room_number: this.state.room_number
                        }) }>
                        <Text style={ styles.buttonTextStyle }>Return to Payments</Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.footerContainer }>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('PaymentHistoryScreen', {
                            tenant_id: this.state.tenant_id,
                            email: this.state.email,
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            mobile_number: this.state.mobile_number,
                            room_number: this.state.room_number
                        }) }
                        style={{ flex: 1, alignSelf: 'center' }}>
                        <Image
                            style={{ alignSelf: 'center' }}
                            source={ require('../images/refresh-icon-payment.png') } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('TenantHomeScreen', { email: this.state.email }) }
                        style={{ flex: 1, alignSelf: 'center' }}>
                        <Image
                            style={{ alignSelf: 'center' }}
                            source={ require('../images/home-icon-payment.png') } />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    paymentViewContainer: {
        flex: 6,
        margin: 4,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#0A7887',
        backgroundColor: '#fff'
    },
    headerText: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#0A7887',
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    paymentViewTitles: {
        flex: 1,
        flexDirection: 'row'
    },
    dataContainer: {
        flex: 6
    },
    buttonContainer: {
        flex: 4,
        padding: 8,
        marginTop: 8
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: '#3FA3B2',
        marginBottom: 8,
        alignSelf: 'stretch'
    },
    buttonTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        paddingBottom: 12,
        paddingTop: 12
    },
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
