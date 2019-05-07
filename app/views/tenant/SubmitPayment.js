import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Image, Keyboard, ActivityIndicator } from 'react-native';

var date = new Date();

export class SubmitPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenant_id: this.props.navigation.getParam('tenant_id', 0),
            email: this.props.navigation.getParam('email', ''),
            first_name: this.props.navigation.getParam('first_name', ''),
            last_name: this.props.navigation.getParam('last_name', ''),
            mobile_number: this.props.navigation.getParam('mobile_number', 0),
            room_number: this.props.navigation.getParam('room_number', 0),
            building_id: this.props.navigation.getParam('building_id', 0),
            payments: [],
            payment_id: 0,
            payment_amount: 0,
            payment_description: '',
            payment_due_date: '',
            payment_date_submitted: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            viewLoading: false,
            selectPayment: false,
            payment_submitted: false,
            card_number: 0,
            exp_date: '',
            cvv_number: 0,
            submitLoading: false
        }
    }
    componentWillMount() {
        this.setState({
            viewLoading: true
        });
        return fetch('https://comp490.000webhostapp.com/public/payments.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option: 'view_payment_requests',
                tenant_id: this.state.tenant_id
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(!responseJson.success)
                console.warn(responseJson.message);
            else {
                console.log(responseJson);
                this.setState({
                    payments: responseJson.payment_requests,
                    viewLoading: false
                });
            }
        })
        .catch(error => {
            console.error(error);
            this.setState({
                viewLoading: false
            });
        });
    }
    renderPaymentRequests = () => {
        if(this.state.viewLoading) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return this.state.payments.map((payment, index) => {
            if(index % 2 == 0)
                backgroundColor = '#eee';
            else
                backgroundColor = '#fff';
            return (
                <TouchableOpacity
                    key={ index }
                    onPress={ () => this.selectPayment(payment[0], payment[1], payment[2], payment[3]) }>
                    <View style={{ flexDirection: 'row', backgroundColor: backgroundColor }}>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ payment[1] }</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ payment[2] }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ payment[3] }</Text>
                    </View>
                </TouchableOpacity>
                
            );
        });
    }
    selectPayment = (payment_id, payment_amount, payment_description, payment_due_date) => {
        this.setState({
            payment_id: payment_id,
            payment_amount: payment_amount,
            payment_description: payment_description,
            payment_due_date: payment_due_date,
            selectPayment: true
        });
    }
    renderForm = () => {
        return (
            <View style={{ flex: 10 }}>
                {
                    this.state.payment_submitted
                    ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 24 }}>Payment Submitted</Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={ styles.formContainer }>
                            <View style={ styles.inputContainer }>
                                <Text style={ styles.inputTextStyle }>Card Number</Text>
                                <TextInput
                                    style={ styles.inputStyle }
                                    underlineColorAndroid='transparent'
                                    autoCorrect={ false }
                                    keyboardType='numeric'
                                    onChangeText={ (text) => this.setState({ card_number: text }) } />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, marginRight: 16 }}>
                                    <Text style={ styles.inputTextStyle }>Exp. Date</Text>
                                    <TextInput
                                        placeholder='MM/YY'
                                        style={ styles.inputStyle }
                                        underlineColorAndroid='transparent'
                                        autoCorrect={ false }
                                        keyboardType='number-pad'
                                        onChangeText={ (text) => this.setState({ exp_date: text }) } />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={ styles.inputTextStyle }>CVV</Text>
                                    <TextInput
                                        style={ styles.inputStyle }
                                        underlineColorAndroid='transparent'
                                        autoCorrect={ false }
                                        keyboardType='numeric'
                                        onChangeText={ (text) => this.setState({ cvv_number: text }) } />
                                </View>
                            </View>
                        </View>
                        { this.renderButton() }
                    </View>
                }
            </View>
        );
    }
    renderButton = () => {
        if(this.state.submitLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return (
            <View style={ styles.submitContainer }>
                <TouchableOpacity
                    style={ styles.requestButton }
                    onPress={ () => this.submitPayment() }>
                    <Text style={ styles.requestButtonText }>Submit Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ styles.cancelButton }
                    onPress={ () => this.cancelPayment() }>
                    <Text style={ styles.cancelButtonText }>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }
    submitPayment = () => {
        this.setState({
            submitLoading: true
        });
        return fetch('https://comp490.000webhostapp.com/public/payments.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option: 'submit_payment',
                id: this.state.payment_id,
                date_submitted: this.state.payment_date_submitted
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(!responseJson.success) {
                console.warn(responseJson.message);
                this.setState({
                    submitLoading: false
                });
            }
            else {
                console.log(responseJson);
                this.setState({
                    payment_submitted: true,
                    submitLoading: false
                });
            }
        })
        .catch(error => {
            console.error(error);
            this.setState({
                submitLoading: false
            });
        });
    }
    cancelPayment = () => {
        this.setState({
            selectPayment: false
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                {
                    this.state.selectPayment
                    ?
                    <View style={{ flex: 6 }}>
                        <View style={ styles.formHeader }>
                            <Text style={ styles.formHeaderText }>{ this.state.payment_description } -- ${ this.state.payment_amount }</Text>
                        </View>
                        { this.renderForm() }
                    </View>
                    :
                    <View style={ styles.paymentContainer }>
                        <Text style={ styles.paymentHeaderText }>Required Payments</Text>
                        <View style={ styles.listTitle }>
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
                            }}>Due Date</Text>
                        </View>
                        <View style={{ flex: 8 }}>
                            <ScrollView>
                                { this.renderPaymentRequests() }
                            </ScrollView>
                        </View>
                    </View>
                    
                }

                <View style={ styles.footerStyle }>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('SubmitPaymentScreen', { email: this.state.email}) }
                        style={{ flex: 1, alignSelf: 'center' }}>
                        <Image
                            style={{ alignSelf: 'center' }}
                            source={ require('../../images/refresh-icon.png') } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => {
                            // alert(this.state.email);
                            this.props.navigation.push('TenantHomeScreen', { email: this.state.email });
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
    paymentContainer: {
        flex: 5,
        margin: 4,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#2771AC',
        marginTop: 32
    },
    paymentHeaderText: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
        // height: '100%',
        textAlignVertical: 'center',
        borderBottomWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#2771AC',
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    listTitle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    // tenantListContainer: {
    //     flex: 8
    //     // borderWidth: 1
    // },
    formHeader: {
        flex: 1,
        // borderWidth: 1,
        justifyContent: 'flex-end'
    },
    formHeaderText: {
        fontSize: 22,
        // borderWidth: 1,
        textAlign: 'center'
    },
    formContainer: {
        flex: 2,
        margin: 16,
        padding: 12,
        // borderWidth: 1
    },
    inputContainer: {
        marginBottom: 16
    },
    inputTextStyle: {
        fontSize: 16
    },
    inputStyle: {
        padding: 4,
        paddingLeft: 8,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 3,
        backgroundColor: '#efefef',
    },
    submitContainer: {
        flex: 1,
        // borderWidth: 1
    },
    requestButton: {
        borderRadius: 5,
        backgroundColor: '#1d64b4',
        margin: 8,
        marginLeft: 20,
        marginRight: 20,
        padding: 8,
        alignSelf: 'stretch',
        justifyContent: 'flex-end'
    },
    requestButtonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10
    },
    cancelButton: {
        borderRadius: 5,
        backgroundColor: '#f00',
        margin: 8,
        marginLeft: 20,
        marginRight: 20,
        padding: 8,
        alignSelf: 'stretch',
        justifyContent: 'flex-end'
    },
    cancelButtonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10
    },
    spinnerStyle: {
        marginTop: '40%',
        alignSelf: 'center'
    },
    footerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});