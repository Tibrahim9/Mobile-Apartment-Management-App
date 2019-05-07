import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Image, Keyboard, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';

export class PaymentRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenant_id: 0,
            tenant_email: '',
            tenant_room_number: 0,
            tenants: [],
            amount: 0,
            description: '',
            due_date: '',
            building_id: 1,
            loading_tenants: false,
            tenant_selected: false,
            manager_id: this.props.navigation.getParam('manager_id', ''),
            email: this.props.navigation.getParam('email', ''),
            first_name: this.props.navigation.getParam('first_name', ''),
            last_name: this.props.navigation.getParam('last_name', ''),
            mobile_number: this.props.navigation.getParam('mobile_number', ''),
            request_submitted: false,
            date_visible: false,
            display_date: '',
            request_loading: false
        };
    }
    componentWillMount() {
        // alert(new Date());
        this.setState({
            loading_tenants: true
        });
        return fetch('https://comp490.000webhostapp.com/public/tenants.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option: 'get_tenants',
                building_id: this.state.building_id
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(!responseJson.success) {
                console.warn(responseJson.message);
                this.setState({
                    loading_tenants: false
                });
            }
            else {
                console.log(responseJson);
                this.setState({
                    loading_tenants: false,
                    tenants: responseJson.tenants
                });
            }
        })
        .catch(error => console.warn(error));
    }
    renderTenants = () => {
        if(this.state.loading_tenants) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return this.state.tenants.map((tenant, index) => {
            if(index % 2 == 0)
                backgroundColor = '#eee';
            else
                backgroundColor = '#fff';
            return (
                <TouchableOpacity
                    key={ index }
                    onPress={ () => this.selectTenant(tenant[0], tenant[1], tenant[2]) }>
                    <View style={{ flexDirection: 'row', backgroundColor: backgroundColor }}>
                        <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ tenant[2] }</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ tenant[1] }</Text>
                    </View>
                </TouchableOpacity>
                
            );
        });
    }
    selectTenant = (tenant_id, tenant_email, tenant_room_number) => {
        this.setState({
            tenant_id: tenant_id,
            tenant_email: tenant_email,
            tenant_room_number: tenant_room_number,
            selectTenant: true
        });
    }
    renderForm = () => {
        return (
            <View style={{ flex: 10 }}>
                {
                    this.state.request_submitted
                    ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 24 }}>Payment Request Submitted</Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={ styles.formContainer }>
                            <View style={ styles.inputContainer }>
                                <Text style={ styles.inputTextStyle }>Amount</Text>
                                <TextInput
                                    style={ styles.inputStyle }
                                    underlineColorAndroid='transparent'
                                    autoCorrect={ false }
                                    keyboardType='numeric'
                                    onChangeText={ (text) => this.setState({ amount: text }) } />
                            </View>
                            <View style={ styles.inputContainer }>
                                <Text style={ styles.inputTextStyle }>Description</Text>
                                <TextInput
                                    style={ styles.inputStyle }
                                    underlineColorAndroid='transparent'
                                    onChangeText={ (text) => this.setState({ description: text }) } />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={ this.showPicker }
                                    style={ styles.dateButton }>
                                    <Text style={ styles.dateButtonText }>Due Date</Text>
                                </TouchableOpacity>
                                <Text style={ styles.displayDate }>{ this.state.display_date }</Text>
                            </View>
                            <DateTimePicker
                                isVisible={ this.state.date_visible }
                                onConfirm={ this.handlePicker }
                                onCancel={ this.hidePicker } />
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
                    onPress={ () => this.submitPaymentRequest() }>
                    <Text style={ styles.requestButtonText }>Submit Payment Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ styles.cancelButton }
                    onPress={ () => this.cancelPaymentRequest() }>
                    <Text style={ styles.cancelButtonText }>Cancel Payment Request</Text>
                </TouchableOpacity>
            </View>
        );
    }
    submitPaymentRequest = () => {
        this.setState({
            request_loading: true
        });
        return fetch('https://comp490.000webhostapp.com/public/payments.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                option: 'request_payment',
                amount: this.state.amount,
                description: this.state.description,
                due_date: this.state.due_date,
                tenant_id: this.state.tenant_id
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(!responseJson.success) {
                console.warn(responseJson.message);
                this.setState({
                    request_loading: false
                });
            }
            else {
                console.log(responseJson);
                this.setState({
                    request_submitted: true,
                    request_loading: false
                });
            }
        })
        .catch(error => {
            console.error(error);
            this.setState({
                request_loading: false
            });
        });
    }
    cancelPaymentRequest = () => {
        this.setState({
            selectTenant: false
        });
    }
    showPicker = () => {
        this.setState({
            date_visible: true
        });
    }
    handlePicker = (date) => {
        // alert((date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear());
        let display_date = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
        let due_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.setState({
            display_date: display_date,
            due_date: due_date
        });
        this.hidePicker();
    }
    hidePicker = () => {
        this.setState({
            date_visible: false
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                {
                    this.state.selectTenant
                    ?
                    <View style={{ flex: 6 }}>
                        <View style={ styles.formHeader }>
                            <Text style={ styles.formHeaderText }>{ this.state.tenant_email } -- #{ this.state.tenant_room_number }</Text>
                        </View>
                        { this.renderForm() }
                    </View>
                    :
                    <View style={ styles.tenantContainer }>
                        <Text style={ styles.tenantHeaderText }>Tenants List</Text>
                        <View style={ styles.listTitle }>
                            <Text style={{
                                flex: 1,
                                alignSelf: 'center',
                                textAlign: 'center',
                                borderRightWidth: 1,
                                borderColor: '#ccc',
                                fontSize: 16
                            }}>Room #</Text>
                            <Text style={{
                                flex: 3,
                                alignSelf: 'center',
                                textAlign: 'center',
                                borderRightWidth: 1,
                                borderColor: '#ccc',
                                fontSize: 16
                            }}>Tenant Email</Text>
                        </View>
                        <View style={ styles.tenantListContainer }>
                            <ScrollView>
                                { this.renderTenants() }
                            </ScrollView>
                        </View>
                    </View>
                    
                }

                <View style={ styles.footerStyle }>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('PaymentRequestScreen', { email: this.state.email}) }
                        style={{ flex: 1, alignSelf: 'center' }}>
                        <Image
                            style={{ alignSelf: 'center' }}
                            source={ require('../../images/refresh-icon.png') } />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('ManagerPaymentScreen', { email: this.state.email}) }
                        style={{ flex: 1, alignSelf: 'center' }}>
                        <Image
                            style={{ alignSelf: 'center' }}
                            source={ require('../../images/return-icon-payment.png') } />
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
    tenantContainer: {
        flex: 5,
        margin: 4,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#2771AC',
        marginTop: 32
    },
    tenantHeaderText: {
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
    tenantListContainer: {
        flex: 8
        // borderWidth: 1
    },
    formHeader: {
        flex: 1,
        // borderWidth: 1,
        justifyContent: 'flex-end'
    },
    formHeaderText: {
        fontSize: 18,
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
    dateButton: {
        backgroundColor: '#3FA3B2',
        width: 160,
        padding: 16,
        marginTop: 12,
        borderRadius: 10
    },
    dateButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center'
    },
    displayDate: {
        fontSize: 24,
        alignSelf: 'center',
        marginLeft: '10%',
        marginTop: 12
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