import React from 'react';
import { StyleSheet, View, Text, Picker, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';

export class PaymentEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            building_id: 1,
            open_payments: [],
            closed_payments: [],
            open_payments_loading: false,
            closed_payments_loading: false,
            email: this.props.navigation.getParam('email', '')
        };
    }
    componentWillMount() {
        this.setState({
            open_payments_loading: true,
            closed_payments_loading: true
        });
        return fetch('https://comp490.000webhostapp.com/public/payments.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option: 'view_payments_manager',
                building_id: this.state.building_id,
                email: this.state.email
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(!responseJson.success) {
                console.warn(responseJson.message);
                this.setState({
                    open_payments: responseJson.open_payments,
                    closed_payments: responseJson.closed_payments,
                    open_payments_loading: false,
                    closed_payments_loading: false
                });
            }
            else {
                console.log(responseJson);
                this.setState({
                    open_payments: responseJson.open_payments,
                    closed_payments: responseJson.closed_payments,
                    open_payments_loading: false,
                    closed_payments_loading: false
                });
            }
        })
        .catch(error => console.warn(error));
    }
    renderOpenPayments = () => {
        if(this.state.open_payments_loading) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return this.state.open_payments.map((payment, index) => {
            // switch(payment[4]) {
            //     case 1:
            //         status = 'Submitted';
            //         break;
            //     default:
            //         status = 'Status Error'
            // }
            if(index % 2 == 0)
                backgroundColor = '#eee';
            else
                backgroundColor = '#fff';
            return (
                <View key={ index } style={{ backgroundColor: backgroundColor }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ payment[6][0] + ' ' + payment[6][1][0] + '.' }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ '$' + payment[1] }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ payment[3] }</Text>
                        <Picker
                            selectedValue={ payment[4] }
                            onValueChange={ (itemValue, index) => this.statusChange(payment[0], itemValue) }
                            style={{
                                flex: 3,
                                alignSelf: 'center',
                                paddingTop: 8,
                                paddingBottom: 8
                            }} >
                            <Picker.Item label="Requested" value={ 1 } />
                            <Picker.Item label="Pending" value={ 2 } />
                            <Picker.Item label="Completed" value={ 3 } />
                            <Picker.Item label="Remove" value={ -1 } />
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 4 }}>
                        <Text style={{
                            flex: 2,
                            textAlign: 'center'
                        }}>Description: </Text>
                        <Text style={{
                            flex: 5
                        }}>{ payment[2] }</Text>
                    </View>
                </View>
            )
        });
    }
    renderClosedPayments = () => {
        if(this.state.closed_payments_loading) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return this.state.closed_payments.map((payment, index) => {
            // switch(payment[4]) {
            //     case 1:
            //         status = 'Submitted';
            //         break;
            //     default:
            //         status = 'Status Error'
            // }
            if(index % 2 == 0)
                backgroundColor = '#eee';
            else
                backgroundColor = '#fff';
            return (
                <View key={ index } style={{ backgroundColor: backgroundColor }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ payment[6][0] + ' ' + payment[6][1][0] + '.' }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ '$' + payment[1] }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ payment[3] }</Text>
                        <Picker
                            selectedValue={ payment[4] }
                            onValueChange={ (itemValue, index) => this.statusChange(payment[0], itemValue) }
                            style={{
                                flex: 3,
                                alignSelf: 'center',
                                paddingTop: 8,
                                paddingBottom: 8
                            }} >
                            <Picker.Item label="Requested" value={ 1 } />
                            <Picker.Item label="Pending" value={ 2 } />
                            <Picker.Item label="Completed" value={ 3 } />
                            <Picker.Item label="Remove" value={ -1 } />
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 4 }}>
                        <Text style={{
                            flex: 2,
                            textAlign: 'center'
                        }}>Description: </Text>
                        <Text style={{
                            flex: 5
                        }}>{ payment[2] }</Text>
                    </View>
                </View>
            )
        });
    }
    statusChange = (payment_id, itemValue) => {
        if(itemValue == -1) {
            option = 'remove_payment';
        }
        else
            option = 'update_payment_status';

        return fetch('https://comp490.000webhostapp.com/public/payments.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    option: option,
                    id: payment_id,
                    new_status: itemValue
                })
            })
            .then(response => response.json())
            .then(responseJson => {
                if(!responseJson.success)
                    console.warn(responseJson.message)
                else {
                    console.log(responseJson);
                    this.props.navigation.push('PaymentEditScreen', { email: this.state.email });
                }
            })
            .catch(error => console.warn(error));
    }
    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.headerTextView }>
                    <Text style={ styles.headerText }>Tenants' Payments</Text>
                </View>
                <View style={ styles.openRequestContainer }>
                    <Text style={ styles.openTitleText }>Payments Due</Text>
                    <View style={ styles.listTitle }>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Tenant</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Amount</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Due Date</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 16
                        }}>Status</Text>
                    </View>
                    <View style={ styles.infoContainer }>
                        <ScrollView>
                            { this.renderOpenPayments() }
                        </ScrollView>
                    </View>
                </View>
                <View style={ styles.previousRequestContainer }>
                    <Text style={ styles.previousTitleText }>Payments Made</Text>
                    <View style={ styles.listTitle }>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Tenant</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Amount</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Date Sub.</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 16
                        }}>Status</Text>
                    </View>
                    <View style={ styles.infoContainer }>
                        <ScrollView>
                            { this.renderClosedPayments() }
                        </ScrollView>
                    </View>
                </View>
                <View style={ styles.footerStyle }>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('PaymentEditScreen', { email: this.state.email}) }
                        style={{ flex: 1, alignSelf: 'center' }}>
                        <Image
                            style={{ alignSelf: 'center' }}
                            source={ require('../../images/refresh-icon.png') } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => {
                            // alert(this.state.email);
                            this.props.navigation.push('ManagerHomeScreen', { email: this.state.email });
                        } }
                        style={{ flex: 1, alignSelf: 'center' }}>
                        <Image
                            style={{ alignSelf: 'center' }}
                            source={ require('../../images/home-icon.png') } />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerTextView: {
        flex: 1,
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        alignSelf: 'center',
        padding: 12
    },
    openTitleText: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#2771AC',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    previousTitleText: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#D7D41D',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    listTitle: {
        flex: 1,
        flexDirection: 'row'
    },
    infoContainer: {
        flex: 4
    },
    openRequestContainer: {
        flex: 3,
        margin: 4,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#2771AC'
    },
    openRequest: {

    },
    previousRequestContainer: {
        flex: 3,
        margin: 4,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#D7D41D'
    },
    previousRequest: {

    },
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});