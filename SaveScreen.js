/*
Created by Ruthvik on 10/06/2023
Part of a code for SRpass app in react native
*/
import * as React from 'react';
import { Text, View, StyleSheet,ScrollView,Alert,ActivityIndicator } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import * as Device from 'expo-device';

const FirstScreen = () => {
  const [title, setTitle] = React.useState("");
  const [username,setUsername]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [category,setCategory]=React.useState("");
  const [description,setDescription]=React.useState("");
  const [selectedtype, setSelectedtype] = React.useState("Final"); //can be a date or final password
  const [selectedRecurrence, setSelectedRecurrence] = React.useState("False");//to handle password expiry
  const [loading, setLoading] = React.useState(false);//to handle the loading effect
  let deviceId =Device.designName;

  function handlesave() {
    //when username,password,title is blank then show alert
    if (title === '' || username==='' || password==='') {
      alert('Please fill in all the * fields.');
      return;
    }
    //when category,description are left blank
    else if (category===''||description==='') {
      setCategory("Work");
      setDescription("Nil");
      handleSave();
    }
    //when eveything is filled do save it
    else{
      handleSave();
    }
  }
  function handleSave() {
    setLoading(true);
    //function to save the data
    //removed for obvious reasons
  }
  const handleclr=()=>{
    setTitle("");
    setUsername("");
    setPassword("");
    setCategory("");
    setDescription("");
    setSelectedtype("Final");
    setSelectedRecurrence("False");
  }
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.hstack, { alignItems: 'center', marginBottom: 5 }]}>
        <Icon name="lock-outline" size={40} color="#000000" />
        <Text style={styles.title}>Password Manager</Text>
      </View>
      <View style={[{ marginTop: 1 }]}>
      {loading && <ActivityIndicator size="large" color="#000000" />}
      </View>
      <Card style={styles.card}>
        <View style={styles.entryContainer}>
          <Icon name="database-plus" size={35} color="#000000" />
          <Text style={styles.entryTitle}>New Entry</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Title*"
            value={title}
            placeholder="Website name"
            onChangeText={(text) => setTitle(text)}
            mode="flat"
            maxLength={30}
            style={styles.input}
            theme={{ colors: { primary: '#a9a9a9' } }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Username*"
            value={username}
            placeholder="Username/Email"
            onChangeText={(text) => setUsername(text)}
            mode="flat"
            maxLength={30}
            style={styles.input}
            theme={{ colors: { primary: '#a9a9a9' } }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Password*"
            value={password}
            placeholder="password/[dd/mm/yyyy]"
            onChangeText={(text) => setPassword(text)}
            mode="flat"
            maxLength={32}
            style={styles.input}
            theme={{ colors: { primary: '#a9a9a9' } }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Category"
            value={category}
            placeholder="Work/Personal"
            onChangeText={(text) => setCategory(text)}
            mode="flat"
            maxLength={20}
            style={styles.input}
            theme={{ colors: { primary: '#a9a9a9' } }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            mode="flat"
            multiline={true}
            maxLength={60}
            style={styles.input}
            theme={{ colors: { primary: '#a9a9a9' } }}
          />
        </View>
        <View style={styles.hstack}>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedtype}
              style={styles.dropdown}
              onValueChange={(itemValue) => setSelectedtype(itemValue)}>
              <Picker.Item label="Final" value="final" />
              <Picker.Item label="Date" value="date" />
            </Picker>
          </View>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedRecurrence}
              style={styles.dropdown}
              onValueChange={(itemValue) => setSelectedRecurrence(itemValue)}>
              <Picker.Item label="False" value="False" />
              <Picker.Item label="30 days" value="30" />
              <Picker.Item label="60 days" value="60" />
              <Picker.Item label="90 days" value="90" />
              <Picker.Item label="180 days" value="180" />
            </Picker>
          </View>
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
              marginTop: 40,
              marginLeft:20,
            }}
            containerStyle={{
              width: 120,
            }}
            onPress={handleclr}
          />
          <Button
            title="Save"
            titleStyle={{
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
            buttonStyle={{
              backgroundColor: '#000000',
              borderRadius: 20,
              marginTop: 40,
              marginLeft:50,
            }}
            containerStyle={{
              width: 150,
            }}
            onPress={handlesave}
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
    paddingBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '97%',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  entryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputContainer: {
    width: 250,
    height: 65,
  },
  input: {
    backgroundColor: 'transparent',
    marginTop: 5,
    fontSize: 14,
  },
  dropdownContainer: {
    marginTop: 25,
  },
  dropdown: {
    width: 140,
    height: 20,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 5,
  },
});

export default FirstScreen;
