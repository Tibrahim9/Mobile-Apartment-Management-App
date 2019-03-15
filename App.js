import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import { Home } from './app/views/Home';
import { Login } from './app/views/Login';
import { Register } from './app/views/Register';
import { TenantHome } from './app/views/TenantHome';
import { CreateProfile } from './app/views/CreateProfile';
import { Maintenance } from './app/views/Maintenance';
import { MaintenanceRequest } from './app/views/MaintenanceRequest';
import { MaintenanceRequestView } from './app/views/MaintenanceRequestView';
import { MaintenanceRequestList } from './app/manager/MaintenanceRequestList';
import { Payment } from './app/views/Payment';
import { PaymentHistory } from './app/views/PaymentHistory';

const MyRoutes = StackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  },
  MaintenanceScreen: {
    screen: Maintenance,
    navigationOptions: {
      title: 'Maintenance',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  },
  MaintenanceRequestScreen: {
    screen: MaintenanceRequest,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  },
  MaintenanceRequestViewScreen: {
    screen: MaintenanceRequestView,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#D5D708'
      },
      headerTintColor: '#fff'
    }
  },
  MaintenanceRequestListScreen: {
    screen: MaintenanceRequestList,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#D5D708'
      },
      headerTintColor: '#fff'
    }
  },
  LoginScreen: {
    screen: Login,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  },

  RegisterScreen: {
    screen: Register,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  },

  CreateProfileScreen: {
    screen: CreateProfile,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  },
  PaymentScreen: {
    screen: Payment,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#3FA3B2'
      },
      headerTintColor: '#fff'
    }
  },
  PaymentHistoryScreen: {
    screen: PaymentHistory,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#3FA3B2'
      },
      headerTintColor: '#fff'
    }
  },
  TenantHomeScreen: {
    screen: TenantHome,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  }
}, {
  initialRouteName: 'HomeScreen'
});

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBXdWWKMhQ35AjrKbcb_lv6LoWM-KxrJj8",
      authDomain: "apartmentapp-f0bde.firebaseapp.com",
      databaseURL: "https://apartmentapp-f0bde.firebaseio.com",
      projectId: "apartmentapp-f0bde",
      storageBucket: "",
      messagingSenderId: "813620497525"
    });
    // firebase.auth().onAuthStateChanged((user) => {
    //     if(user)
    //         this.setState({ loggedIn: true });
    //     else
    //         this.setState({ loggedIn: false });
    // });
}
  render() {
      return (
        <MyRoutes />
      );
  }
}
