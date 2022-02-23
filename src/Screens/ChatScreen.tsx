import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Modal, View, StyleSheet, Text, Pressable, Button } from 'react-native';
import { ChannelList, Chat, OverlayProvider } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';

import ChatTextField from '../components/ChatTextField';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface ChatProps {
    route: any;
    navigation: any
    // client: string;
}


const ChatScreen: React.FC<ChatProps> = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [chatRoomName, setChatRoomName] = useState('');
    const [chatRoomDescription, setChatRoomDescription] = useState('');
    const [channelsKey, setChannelsKey] = useState(1);
    const [clientReady, setClientReady] = useState(false);
  
    useEffect(() => {
      const setupClient = async () => {
        await chatClient.connectUser(user, userToken);
  
        setClientReady(true);
      };
  
      setupClient();
    }, []);


    // const filters = {};
    const options = {limit: 20, messages_limit: 30};


  const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3VtbWVyLXN1bnNldC02In0.pLJne2iHKyhvQtFUCSEl_ken4h8PKG7DJDzMGz3hsIM';
  const chatClient = StreamChat.getInstance('nrufz8xdz2u6');

  const user = { id: 'summer-sunset-6' };

  const filters = {
    members: { $in: ['summer-sunset-6'] },
    type: 'messaging',
  };

  


    const makeid = (length: number) => {
        var result = '';
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };

    async function createChatRoom() {
        const channel = chatClient.channel('messaging', makeid(9), {
          name: chatRoomName,
          description: chatRoomDescription,
        });
    
        try {
          await channel.create();
        } catch (err) {
          console.log(err);
        }
    
        setModalVisible(!modalVisible);
        setChatRoomName('');
        setChatRoomDescription('');
    
        setChannelsKey(channelsKey + 1);
      }

    const handleCancel = () => {
        setModalVisible(false);
  };
  
  chatClient.updateAppSettings({
    disable_auth_checks: true,
  });

    
      // INIT STREAM - ONCE
  useEffect(() => {
    const connectStreamUser = async ({token}:any) => {
      try {
        await chatClient.connectUser(
          {
            id: route.params.userId,
            name: route.params.userName,
            // email: email
          },
          token,
        );
        console.log('logged in');
        setChannelsKey(channelsKey + 1);
      } catch (err) {
        console.log('----------ERROR-----------');
        console.log(err);
      }
    };

    if (!chatClient.userID) {
      connectStreamUser({});
    }
  }, []);
    
      // HEADER
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        modalVisible ? null : (
          <Button
            onPress={() => setModalVisible(!modalVisible)}
            title="Create"
          />
        ),
      headerLeft: () => null,
    });
  }, [navigation, modalVisible]);
    
    
  const CustomPreviewTitle = ({channel}: {channel: any}) => (
    <Text>
      {channel.data.name} - {channel.data.description}
    </Text>
  );

  return (
      <OverlayProvider>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
              setModalVisible(!modalVisible);
          }}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                          Create a Chat Room
                      </Text>
                      <ChatTextField
                          style={styles.input}
                          onTextChange={setChatRoomName}
                          value={chatRoomName}
                          placeholder="Chat Room Name"
                      />
                      <ChatTextField 
                          style={styles.inputMultiline}
                          onTextChange={setChatRoomDescription}
                          value={chatRoomDescription}
                          multiline
                          numberOfLines={4}
                          maxLength={100}
                          placeholder="Short Description"
                      />
                      <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={handleCancel}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                createChatRoom();
                                }}>
                                <Text style={styles.textStyle}>Create Room</Text>
                            </Pressable>
                      </View>
                  </View>
              </View>

          </Modal>
          <Chat client={chatClient}>
        <ChannelList
          key={channelsKey}
          PreviewTitle={CustomPreviewTitle}
          filters={filters}
          options={options}
          onSelect={channel => {
            navigation.navigate('ChatRoom', {
              channel: channel,
              chatClient: chatClient,
              name: channel.data?.name,
            });
          }}
        />
      </Chat>
      </OverlayProvider>
  );
}

const styles = StyleSheet.create({
    input: {
      width: 200,
      height: 40,
      margin: 12,
      borderWidth: 0.2,
      padding: 5,
    },
    inputMultiline: {
      padding: 5,
      width: 200,
      height: 80,
      margin: 12,
      borderWidth: 0.2,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 4,
      padding: 10,
      elevation: 2,
    },
    buttonCancel: {
      backgroundColor: '#888888',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: 200,
    },
  });
  

export default ChatScreen;

