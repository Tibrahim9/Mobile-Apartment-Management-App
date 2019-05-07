import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StreamApp, FlatFeed, Activity, LikeButton, StatusUpdateForm} from 'expo-activity-feed';

const CustomActivity = (props) => {
  return (
    <Activity
      {...props}
      Footer={
        <LikeButton {...props} />
      }
    />
  );
};
const activity = {
  actor: {
    data: {
      name: 'Terry Walker',
      profileImage: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
  },
  object: 'Hey @Thierry how are you doing?',
  verb: 'post',
  time: new Date(),
};
export class Information extends React.Component {

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
              <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
              <StreamApp
                  apiKey="5rqsbgqvqphs"
                  appId="40273"
                  token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZWE0ZWZmN2QtMDc2MC00YTFkLTllM2QtNTEyM2ZmYjBlNGRiIn0.pp1S14_kOaCbcY1SVnZAV2GZdQIQ75LDN6TA4Hx2qtA"
              >
              <FlatFeed Activity={CustomActivity} />
              <StatusUpdateForm feedGroup="timeline" />

              </StreamApp>
              </SafeAreaView>
        );
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