/*
Created by Ruthvik on 10/06/2023
Part of a code for SRpass app in react native
*/
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Clipboard,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Card, Searchbar, TextInput, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import * as Device from 'expo-device';
import { LogBox } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
LogBox.ignoreLogs(['Clipboard']);

const ThirdScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [text, setText] = React.useState('Edit Entry');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [type, settype] = React.useState('Final');
  const [updated, setUpdated] = React.useState('');//to handle last updated
  const [recur, setrecur] = React.useState('');//to handle the password expiry status
  const [loading, setLoading] = React.useState(false);//to handle loading effect
  const [stat, setstat] = React.useState(false);//to handle status of search
  const [auth, setAuth] = React.useState('');//to handle confirmation password while deleting
  const [isModalVisible, setIsModalVisible] = React.useState(false);//to handle delete popup
  let deviceId = Device.designName;

  function handleupdate() {
    //when update is clicked without searching anything alert the user
    if (stat === true) {
      //when username,password are empty
      if (username === '' || password === '') {
        alert('Please fill in all the * fields.');
        return;
      } else if (category === '' || description === '') {//when cat,description are left blank
        setCategory('Work');
        setDescription('Nil');
        handleUpdate();
      } else {
        handleUpdate();
      }
    } else {
      Alert.alert('Please search before proceeding');
    }
  }

  function handledel() {
    //to handle delete operation when search is performed already
    //popup a confirmation alert
    if (stat === true) {
      Alert.alert(
        'Delete Entry',
        'Are you sure you want to delete ' + text + '?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setIsModalVisible(true);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Please search before proceeding');
    }
  }

  const handlePasswordSubmit = () => {
    //when password is entered after confirmation
    if (auth === '**********') {
      setIsModalVisible(false);
      setAuth('');
      handleDelete();
      setstat(false);
    } else {
      Alert.alert(
        'Incorrect Password',
        'Please enter the correct password to delete the entry.'
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAuth('');
  };

  const handleclr = () => {
    setLoading(false);
    setstat(false);
    setText('Edit Entry');
    setSearchQuery('');
    setUsername('');
    setPassword('');
    setCategory('');
    setDescription('');
    settype('');
    setUpdated('');
    setrecur('');
  };

  function handleSearch() {
    setLoading(true);
    //to handle search operation
    //removed for obvious reasons
  }

  function handleUpdate() {
    setLoading(true);
    //to handle update operation
    //removed for obvious reasons
  }

  function handleDelete() {
    setLoading(true);
    //to  handle delete operation
    //removed for obvious reasons
  }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={[
            styles.hstack,
            { alignItems: 'center', marginBottom: 5, marginTop: 10 },
          ]}>
          <Icon name="lock-outline" size={40} color="#000000" />
          <Text style={styles.title}>Password Manager</Text>
        </View>
        <View>
          {loading && <ActivityIndicator size="large" color="#000000" />}
        </View>
        <Card style={styles.card}>
          <View style={styles.entryContainer}>
            <Icon name="database-edit" size={35} color="#000000" />
            <Text style={styles.entryTitle}>{text}</Text>
          </View>
          <Searchbar
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            onIconPress={() => {
              handleSearch();
            }}
            onClearIconPress={() => {
              setText('Edit Entry');
            }}
            style={styles.input}
            inputStyle={styles.searchstyle}
            iconColor="#000000"
            clearIconColor="#000"
          />
          <View style={styles.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Username*"
                value={username}
                mode="flat"
                placeholder="Username/Email"
                maxLength={30}
                onChangeText={(text) => setUsername(text)}
                style={styles.resbox}
                theme={{ colors: { primary: '#a9a9a9' } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor="#ffffff"
              size={24}
              onPress={() => {
                Clipboard.setString(username);
                Alert.alert('Copied Username to Clipboard!');
              }}
              marginTop={20}
            />
          </View>
          <View style={styles.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Password*"
                value={password}
                mode="flat"
                maxLength={32}
                placeholder="password/[dd/mm/yyyy]"
                onChangeText={(text) => setPassword(text)}
                style={styles.resbox}
                theme={{ colors: { primary: '#a9a9a9' } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor="#ffffff"
              size={24}
              onPress={() => {
                Clipboard.setString(password);
                Alert.alert('Copied Password to Clipboard!');
              }}
            />
          </View>
          <View style={styles.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Category"
                value={category}
                mode="flat"
                placeholder="Work/Personal"
                maxLength={20}
                onChangeText={(text) => setCategory(text)}
                style={styles.resbox}
                theme={{ colors: { primary: '#a9a9a9' } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor="#ffffff"
              size={24}
              onPress={() => {
                Clipboard.setString(category);
                Alert.alert('Copied to Clipboard!');
              }}
            />
          </View>
          <View style={styles.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Description"
                value={description}
                mode="flat"
                maxLength={60}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                style={styles.resbox}
                underlineColor="transparent"
                theme={{ colors: { primary: '#a9a9a9' } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor="#ffffff"
              size={24}
              onPress={() => {
                Clipboard.setString(description);
                Alert.alert('Copied to Clipboard!');
              }}
            />
          </View>
          <View style={styles.hstack}>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={type}
                style={styles.dropdown}
                onValueChange={(itemValue) => settype(itemValue)}>
                <Picker.Item label="Final" value="final" />
                <Picker.Item label="Date" value="date" />
              </Picker>
            </View>
            <View style={styles.smallinput2}>
              <TextInput
                label="Last updated on"
                value={updated}
                disabled={true}
                mode="flat"
                multiline={true}
                style={styles.resbox}
                theme={{ colors: { primary: '#a9a9a9' } }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Status"
              value={recur}
              disabled={true}
              mode="flat"
              style={styles.resbox}
              theme={{ colors: { primary: '#a9a9a9' } }}
            />
          </View>
          <View style={styles.hstack}>
            <Button
              title="Clear"
              titleStyle={{
                color: '#ffffff',
                fontSize: 18,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                backgroundColor: '#000000',
                borderRadius: 20,
                marginTop: 20,
                marginLeft: 25,
              }}
              containerStyle={{
                width: 120,
              }}
              onPress={handleclr}
            />
            <IconButton
              icon="delete"
              iconColor="#ffffff"
              size={40}
              onPress={handledel}
              style={{ marginTop: 20, marginLeft: 12, marginRight: 8 }}
            />
            <Button
              title="Update"
              titleStyle={{
                color: '#ffffff',
                fontSize: 18,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                backgroundColor: '#000000',
                borderRadius: 20,
                marginTop: 20,
                marginLeft: 5,
              }}
              containerStyle={{
                width: 100,
              }}
              onPress={handleupdate}
            />
          </View>
        </Card>
        <Modal isVisible={isModalVisible} backdropOpacity={0.5}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Password</Text>
            <TextInput
              style={styles.pinput}
              secureTextEntry
              placeholder="Password"
              maxLength={25}
              value={auth}
              underlineColor='transparent'
              onChangeText={setAuth}
            />
            <View style={styles.hstack}>
              <Button
                title="Cancel"
                titleStyle={{
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: 20,
                  marginTop: 20,
                  marginLeft: 10,
                }}
                containerStyle={{
                  width: 90,
                }}
                onPress={handleCancel}
              />
              <Button
                title="Submit"
                titleStyle={{
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: 20,
                  marginTop: 20,
                  marginLeft: 5,
                }}
                containerStyle={{
                  width: 90,
                }}
                onPress={handlePasswordSubmit}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    width: '88%',
    borderRadius: 10,
    elevation: 5,
    padding: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hstack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    marginTop: 5,
    fontSize: 14,
    width: '100%',
    marginLeft: '7%',
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },
  pinput:{
    marginTop: 5,
    fontSize: 14,
    width: '100%',
    marginLeft: '7%',
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderColor:'transparent',
  },
  searchstyle: {
    color: '#000',
    placeholderTextColor: '#000000',
  },
  inputContainer: {
    width: 250,
    height: 55,
  },
  dropdownContainer: {
    marginTop: 25,
    marginLeft: 20,
  },
  dropdown: {
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 5,
  },
  smallinput2: {
    width: 180,
    height: 50,
  },
  resbox: {
    marginTop: 5,
    fontSize: 14,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ThirdScreen;
