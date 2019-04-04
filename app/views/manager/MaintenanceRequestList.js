import React from 'react';
import { StyleSheet, View, Text, Picker, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native';

export class MaintenanceRequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            building_id: 1,
            open_maintenance_requests: [],
            previous_maintenance_requests: [],
            openRequestLoading: false,
            previousRequestLoading: false,
            email: this.props.navigation.getParam('email', '')
        };
    }
    componentWillMount() {
        // alert(this.state.email);
        this.setState({
            openRequestLoading: true,
            previousRequestLoading: true
        });
        return fetch('https://comp490.000webhostapp.com/public/maintenance.php', {
        // return fetch('http://apartment-app-comp490.com/public/maintenance.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    option: 'view_requests_manager',
                    building_id: 1
                })
            })
            .then(response => response.json())
            .then(responseJson => {
                if(!responseJson.success)
                    console.warn(responseJson.message);
                else {
                    console.log(responseJson);
                    this.setState({
                        open_maintenance_requests: responseJson.open_maintenance_requests,
                        previous_maintenance_requests: responseJson.previous_maintenance_requests,
                        openRequestLoading: false,
                        previousRequestLoading: false
                    });
                }
            })
            .catch(error => console.warn(error));
    }
    renderOpenRequests = () => {
        if(this.state.openRequestLoading) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return this.state.open_maintenance_requests.map((request, index) => {
            switch(request[4]) {
                case 1:
                    status = 'Submitted';
                    break;
                case 2:
                    status = 'Pending';
                    break;
                case 3:
                    status = 'In Progress';
                    break;
                default:
                    status = 'Status Error'
            }
            if(index % 2 == 0)
                backgroundColor = '#eee';
            else
                backgroundColor = '#fff';
            return (
                <View key={ index } style={{ backgroundColor: backgroundColor }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ request[0] }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ request[1] }</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ request[5] }</Text>
                        <Picker
                            selectedValue={ request[4] }
                            onValueChange={ (itemValue, index) => this.statusChange(request[0], itemValue) }
                            style={{
                                flex: 3,
                                alignSelf: 'center',
                                paddingTop: 8,
                                paddingBottom: 8
                            }} >
                            <Picker.Item label="Submitted" value={ 1 } />
                            <Picker.Item label="Pending" value={ 2 } />
                            <Picker.Item label="In Progress" value={ 3 } />
                            <Picker.Item label="Completed" value={ 4 } />
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
                        }}>{ request[2] }</Text>
                    </View>
                </View>
            )
        });
    }
    statusChange = (maintenance_id, itemValue) => {
        if(itemValue == -1) {
            option = 'remove_request';
        }
        else
            option = 'update_request_status';

        return fetch('https://comp490.000webhostapp.com/public/maintenance.php', {
        // return fetch('http://apartment-app-comp490.com/public/maintenance.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    option: option,
                    id: maintenance_id,
                    new_status: itemValue
                })
            })
            .then(response => response.json())
            .then(responseJson => {
                if(!responseJson.success)
                    console.warn(responseJson.message)
                else {
                    console.log(responseJson);
                    this.props.navigation.push('MaintenanceRequestListScreen', { email: this.state.email });
                }
            })
            .catch(error => console.warn(error));
    }
    renderPreviousRequests = () => {
        if(this.state.previousRequestLoading) {
            return (
                <View style={ styles.spinnerStyle }>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return this.state.previous_maintenance_requests.map((request, index) => {
            if(index % 2 == 0)
                backgroundColor = '#eee';
            else
                backgroundColor = '#fff';
            return (
                <View key={ index } style={{ backgroundColor: backgroundColor }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center',
                            // borderRightWidth: 1,
                            // borderColor: '#ccc',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ request[0] }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            // borderRightWidth: 1,
                            // borderColor: '#ccc',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ request[1] }</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            // borderRightWidth: 1,
                            // borderColor: '#ccc',
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>{ request[6] }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center'
                        }}>Update Status: </Text>
                        <Picker
                            selectedValue={ request[4] }
                            onValueChange={ (itemValue, index) => this.statusChange(request[0], itemValue) }
                            style={{
                                flex: 2,
                                alignSelf: 'center'
                                // paddingTop: 8,
                                // paddingBottom: 8
                            }} >
                            <Picker.Item label="Submitted" value={ 1 } />
                            <Picker.Item label="Pending" value={ 2 } />
                            <Picker.Item label="In Progress" value={ 3 } />
                            <Picker.Item label="Completed" value={ 4 } />
                            <Picker.Item label="Remove" value={ -1 } />
                        </Picker>
                    </View>
                </View>
                
            )
        });
    }
    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.headerTextView }>
                    <Text style={ styles.headerText }>Tenants' Maintenance Requests</Text>
                </View>
                <View style={ styles.openRequestContainer }>
                    <Text style={ styles.openTitleText }>Open Requests</Text>
                    <View style={ styles.listTitle }>
                        <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>ID</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Area</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Date Requested</Text>
                        <Text style={{
                            flex: 3,
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 16
                        }}>Status</Text>
                    </View>
                    <View style={ styles.infoContainer }>
                        <ScrollView>
                            { this.renderOpenRequests() }
                        </ScrollView>
                    </View>
                </View>
                <View style={ styles.previousRequestContainer }>
                    <Text style={ styles.previousTitleText }>Previous Requests</Text>
                    <View style={ styles.listTitle }>
                    <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>ID</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            fontSize: 16
                        }}>Area</Text>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 16
                        }}>Date Completed</Text>
                    </View>
                    <View style={ styles.infoContainer }>
                        <ScrollView>
                            { this.renderPreviousRequests() }
                        </ScrollView>
                    </View>
                </View>
                <View style={ styles.footerStyle }>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.push('MaintenanceRequestListScreen', { email: this.state.email}) }
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