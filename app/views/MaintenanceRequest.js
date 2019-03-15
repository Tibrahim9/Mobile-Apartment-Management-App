import React from "react";
import { TouchableOpacity, StyleSheet, Alert, Picker, Text} from 'react-native';
import { Container, View, Header, Content, Left, Right, Body, Title, Item, Input, Textarea, Button, List, ListItem, Icon, CardItem} from "native-base";
import { Font, AppLoading } from 'expo';

export class MaintenanceRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        isSubmitted: false,
        name: this.props.navigation.getParam('first_name', '') +' '+ this.props.navigation.getParam('last_name', ''),
        mobile_number: this.props.navigation.getParam('mobile_number', ''),
        room_number: this.props.navigation.getParam('room_number', ''),
        email: this.props.navigation.getParam('email', ''),
        tenant_id: this.props.navigation.getParam('tenant_id', ''),
        building_id: this.props.navigation.getParam('building_id', ''),
        first_name: this.props.navigation.getParam('first_name', ''),
        last_name: this.props.navigation.getParam('last_name', ''),
        area: null,
        level: null,
        issue: null,
        fontLoaded: false
        };
    }
    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ fontLoaded: true });
    }
    sendRequest = (tenant_id, area, issue, level) => {
        if(this.state.issue != null){
            return fetch('https://comp490.000webhostapp.com/public/maintenance.php', {
            // return fetch('http://apartment-app-comp490.com/public/maintenance.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tenant_id: tenant_id,
                    building_id: this.state.building_id,
                    area: area,
                    issue: issue,
                    level: level,
                    option: 'submit_request'
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success){
                    this.setState({
                        isSubmitted: true,
                    })
                }
                else {
                    Alert.alert(
                        'Oops !',
                        'Something went wrong',
                        [
                            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        ],
                        { cancelable: false }
                    )
                }

            })
            .catch(error => console.error(error));
        }
        else {
            Alert.alert(
                'Oops !',
                'You forgot some field. Please fill it before submitting',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
            );
        }

    };

    onValueChange(value) {
        this.setState({
            level: value
        });
    }

    onValueChange2(value) {
        this.setState({
            area: value
        });
    }

    _toggleRequestPost(){
        this.setState({
            isSubmitted: false
        })
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <Container>

            <Header androidStatusBarColor="#af1313" style={{ backgroundColor: '#d11919' }}>
                <Body style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                    <Title>MAINTENANT REQUEST</Title>
                </Body>
            </Header>

            <Content style = {{ marginLeft: 10, marginRight:10 }}>
            <View style = {{ backgroundColor:"#f2eded", marginTop: 10 }}>
            {this.state.isSubmitted
            ?
                <View>
                    <CardItem>
                        <Item>
                        <Icon active name="ios-checkmark-circle" style={{fontSize: 30, color: '#4CAF50', marginLeft:5, marginRight:10}} />
                        <Text style = {{flex:1}}>Thanks. We will get in touch with you as soon as possible</Text>
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Body>
                                <TouchableOpacity success onPress={() => this._toggleRequestPost()}>
                                    <Icon active name="refresh" style={{fontSize: 40, color: '#64DD17', marginLeft:10}} />
                                </TouchableOpacity>
                            </Body>
                        </Left>
                        <Right>
                        <Body>
                            <TouchableOpacity success onPress={() => this.props.navigation.push('TenantHomeScreen', {email: this.state.email})}>
                                <Icon active name="ios-home" style={{fontSize: 40, color: '#64DD17', marginLeft:10}} />
                            </TouchableOpacity>
                        </Body>
                        </Right>
                    </CardItem>
                </View>
            :
                <View>

                <View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', marginTop:20 }}>
                    <Text style = {{ fontSize:20, fontWeight: 'bold', color:'#000000', }}>Name: { this.state.first_name } { this.state.last_name }</Text>
                    <Text style = {{ fontSize:20, fontWeight: 'bold', color:'#000000', }}>Room: { this.state.room_number }</Text>
                    <Text style = {{ fontSize:20, fontWeight: 'bold', color:'#000000', }}>Email: { this.state.email }</Text>
                    <Text style = {{ fontSize:20, fontWeight: 'bold', color:'#000000', }}>Phone: { this.state.mobile_number }</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>

                <View style={styles.inputWrap}>
                    <Picker
                        selectedValue={ (this.state.area) }
                        onValueChange={this.onValueChange2.bind(this)}>
                        <Picker.Item label="Room" value="null" />
                        <Picker.Item label="Bathroom" value="Bathroom" />
                        <Picker.Item label="Kitchen" value="Kitchen" />
                        <Picker.Item label="Bedroom" value="Bedroom" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <View style={styles.inputWrap}>
                    <Picker
                        selectedValue={ (this.state.level) || 'a'}
                        onValueChange={this.onValueChange.bind(this)}>
                        <Picker.Item label="Critical Level" value={null} />
                        <Picker.Item label="Normal" value="1" />
                        <Picker.Item label="Emergency" value="2" />
                    </Picker>
                </View>

                </View>

                <Textarea rounded rowSpan={5} bordered placeholder="Description of Issue" onChangeText={input => this.setState({ issue: input })}/>

                <Button block light
                    onPress={ () => this.sendRequest(this.state.tenant_id, this.state.area, this.state.issue, this.state.level) }
                    style={{ marginLeft: 30, marginRight:30 }}>
                    <Text>Submit</Text>
                </Button>
                </View>
            }
            </View>
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
picker: {
  borderWidth:1,
  borderColor: '#848484',
  marginLeft: 60,
  marginRight: 60,
  marginBottom: 10,
},
label: {
  flex: 1,
  fontWeight: 'bold'
},
inputWrap: {
  flex: 1,
  justifyContent: 'space-between',
  flexDirection: 'column'
},
inputarea: {
  flex: 1,
  backgroundColor: '#108c96',
},
inputCritical: {
  flex: 1,
  backgroundColor: '#6fa511',

}
});
