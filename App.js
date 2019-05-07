import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import { Home } from './app/views/Home';
import { Information } from './app/views/Information';

// tenant view screens
import { TenantLogin } from './app/views/tenant/Login';
import { Register } from './app/views/tenant/Register';
import { TenantCreateProfile } from './app/views/tenant/CreateProfile';
import { TenantHome } from './app/views/tenant/Home';
import { Maintenance } from './app/views/tenant/Maintenance';
import { MaintenanceRequest } from './app/views/tenant/MaintenanceRequest';
import { MaintenanceRequestView } from './app/views/tenant/MaintenanceRequestView';
import { TenantPayment } from './app/views/tenant/Payment';
import { PaymentHistory } from './app/views/tenant/PaymentHistory';
import { SubmitPayment } from './app/views/tenant/SubmitPayment';

// manager view screens
import { ManagerHome } from './app/views/manager/Home';
import { ManagerLogin } from './app/views/manager/Login';
import { ManagerCreateProfile } from './app/views/manager/CreateProfile';
import { MaintenanceEdit } from './app/views/manager/Maintenance';
import { ManagerPayment } from './app/views/manager/Payment';
import { PaymentEdit } from './app/views/manager/PaymentEdit';
import { PaymentRequest } from './app/views/manager/PaymentRequest';

const MyRoutes = StackNavigator({
  InformationScreen: {
    screen: Information,
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
  // Home Screens
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
  },
  ManagerHomeScreen: {
    screen: ManagerHome,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#128ACC'
      },
      headerTintColor: '#fff'
    }
  },
  // Login/Register Screens
  // Tenant
  TenantLoginScreen: {
    screen: TenantLogin,
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
  // Manager
  ManagerLoginScreen: {
    screen: ManagerLogin,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#128ACC'
      },
      headerTintColor: '#fff'
    }
  },
  // Create Profile Screens
  TenantCreateProfileScreen: {
    screen: TenantCreateProfile,
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
  ManagerCreateProfileScreen: {
    screen: ManagerCreateProfile,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#128ACC'
      },
      headerTintColor: '#fff'
    }
  },

  // Maintenance Screens
  // Manager
  MaintenanceEditScreen: {
    screen: MaintenanceEdit,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#128ACC'
      },
      headerTintColor: '#fff'
    }
  },
  // Tenant
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
        backgroundColor: '#1d64b4'
      },
      headerTintColor: '#fff'
    }
  },
  // Payment screens
  // Manager
  ManagerPaymentScreen: {
    screen: ManagerPayment,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#128ACC'
      },
      headerTintColor: '#fff'
    }
  },
  PaymentEditScreen: {
    screen: PaymentEdit,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#128ACC'
      },
      headerTintColor: '#fff'
    }
  },
  PaymentRequestScreen: {
    screen: PaymentRequest,
    navigationOptions: {
      title: 'ApartmentApp',
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: '500'
      },
      headerStyle: {
        backgroundColor: '#128ACC'
      },
      headerTintColor: '#fff'
    }
  },
  // Tenant
  TenantPaymentScreen: {
    screen: TenantPayment,
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
  PaymentHistoryScreen: {
    screen: PaymentHistory,
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
  SubmitPaymentScreen: {
    screen: SubmitPayment,
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
