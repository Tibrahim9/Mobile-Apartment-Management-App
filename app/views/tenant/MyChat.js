import React from "react";
 import Chatkit from "@pusher/chatkit-client";

    import { GiftedChat } from "react-native-gifted-chat";
  const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/cc8f529f-2187-47a8-a93d-2e232edd08d0/token";
    const CHATKIT_INSTANCE_LOCATOR = "v1:us1:cc8f529f-2187-47a8-a93d-2e232edd08d0";
    const CHATKIT_ROOM_ID =  "19428561";
    const CHATKIT_USER_NAME = "John Doe";

    export default class Chat extends React.Component {
      state = {
        messages: []
      };


     componentDidMount() {

           const tokenProvider = new Chatkit.TokenProvider({
             url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
           });


           const chatManager = new Chatkit.ChatManager({
             instanceLocator: CHATKIT_INSTANCE_LOCATOR,
             userId: CHATKIT_USER_NAME,
             tokenProvider: tokenProvider
           });


           chatManager.connect().then(currentUser => {
             this.currentUser = currentUser;
             currentUser.addUserToRoom({
               userId: 'Manager',
               roomId: CHATKIT_ROOM_ID,
             })
             this.currentUser.subscribeToRoom({
               roomId: CHATKIT_ROOM_ID,
               hooks: {
                   onMessage: this.onReceive.bind(this)
               }
             });
           });
         }

 onReceive(data) {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),

      user: {
        _id: senderId,
        name: senderId,
        avatar:
          "https://ui-avatars.com/api/?name=" & senderId
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  onSend([message]) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: CHATKIT_ROOM_ID
    });
  }

  render() {
    return (
      <GiftedChat

        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}

        user={{
          _id: CHATKIT_USER_NAME
        }}
      />
    );
  }
}
