/*
Created by Ruthvik on 10/06/2023
Part of a code for SRpass app in react native
*/
import * as React from 'react';
import { Text, View, StyleSheet,Alert,Clipboard,ScrollView,ActivityIndicator } from 'react-native';
import {
  Card,
  Searchbar,
  TextInput,
  IconButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import * as Device from 'expo-device';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Clipboard']);


const SecondScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [text, setText] = React.useState('Search Entry');
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState('');
  const [type, settype] = React.useState('');
  const [updated,setUpdated]=React.useState('');//to handle last update of password
  const [recur, setrecur] = React.useState('');//to handle password expiry status
  const [loading, setLoading] = React.useState(false);//to handle the loading effect
  let deviceId =Device.designName;

  function handleSearch() {
    setLoading(true);
    //handle the search and set the results accordingly
    //removed for obvious reasons
  }

  const handleclr = () => {
    setText("Search Entry");
    setSearchQuery("");
    setUsername('');
    setPassword('');
    setCategory('');
    setDescription('');
    settype('');
    setUpdated('');
    setrecur('');
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.hstack, { alignItems: 'center', marginBottom: 5,marginTop:10 }]}>
        <Icon name="lock-outline" size={40} color="#000000" />
        <Text style={styles.title}>Password Manager</Text>
      </View>
      <View style={[{ marginTop: 1 }]}>
      {loading && <ActivityIndicator size="large" color="#000000" />}
      </View>
      <Card style={styles.card}>
      <View style={styles.entryContainer}>
        <Icon name="database-search" size={35} color="#000000" />
        <Text style={styles.entryTitle}>{text}</Text>
      </View>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          onIconPress={() => {handleSearch()}}
          onClearIconPress={() => {
            setText('Search Entry');
          }}
          style={styles.input}
          inputStyle={styles.searchstyle}
          iconColor="#000000"
          clearIconColor="#000"
        />
        <View style={styles.hstack}>
          <View style={styles.inputContainer}>
            <TextInput
              label="Username"
              value={username}
              disabled={true}
              mode="flat"
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
              label="Password"
              value={password}
              disabled={true}
              mode="flat"
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
              disabled={true}
              mode="flat"
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
              disabled={true}
              mode="flat"
              multiline={true}
              style={styles.resbox}
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
          <View style={styles.smallinput1}>
            <TextInput
              label="Format"
              value={type}
              disabled={true}
              mode="flat"
              multiline={true}
              style={styles.resbox}
              theme={{ colors: { primary: '#a9a9a9' } }}
            />
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
        <View style={{ alignItems:"center" }}>
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
          }}
          containerStyle={{
            width: 120,
          }}
          onPress={handleclr}
        />
        </View>
      </Card>
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
    width: '94%',
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
    width: '97%',
    marginLeft: '5%',
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },
  searchstyle: {
    color: '#000',
    placeholderTextColor: '#000000',
  },
  inputContainer: {
    width: 250,
    height: 60,
  },
  smallinput1: {
    marginLeft: 20,
    width: 100,
    height: 50,
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
});

export default SecondScreen;
