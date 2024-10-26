import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card, Searchbar, TextInput, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-elements";
import * as Device from "expo-device";
import { stylesConfig } from "../utils/styleConfig";

import { white, black, inputgrey, copyToClipboard } from "../utils/config";

const QueryScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [text, setText] = React.useState("Search Entry");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [type, settype] = React.useState("");
  const [updated, setUpdated] = React.useState(""); //to handle last update of password
  const [recur, setrecur] = React.useState(""); //to handle password expiry status
  const [loading, setLoading] = React.useState(false); //to handle the loading effect
  let deviceId = Device.designName;

  function handleSearch() {
    setLoading(true);
    //handle the search and set the results accordingly
    //removed for obvious reasons
  }

  const handleclr = () => {
    setText("Search Entry");
    setSearchQuery("");
    setUsername("");
    setPassword("");
    setCategory("");
    setDescription("");
    settype("");
    setUpdated("");
    setrecur("");
  };

  return (
    <View style={stylesConfig.container}>
      <ScrollView contentContainerStyle={stylesConfig.scrollContent}>
        <View style={stylesConfig.titlecontainer}>
          <Icon name="lock-outline" size={40} color={black} />
          <Text style={stylesConfig.title}>Password Manager</Text>
        </View>
        <Card style={stylesConfig.card}>
          <View style={stylesConfig.entryContainer}>
            <Icon name="database-search" size={35} color={black} />
            <Text style={stylesConfig.entryTitle}>{text}</Text>
            <View style={stylesConfig.loadercontainer}>
              {loading && <ActivityIndicator size="small" color={black} />}
            </View>
          </View>
          <Searchbar
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            onIconPress={() => {
              handleSearch();
            }}
            onClearIconPress={() => {
              setText("Search Entry");
            }}
            style={styles.input}
            inputStyle={styles.searchstyle}
            iconColor={black}
            clearIconColor={black}
          />
          <View style={stylesConfig.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Username"
                value={username}
                disabled={true}
                mode="flat"
                style={styles.resbox}
                theme={{ colors: { primary: inputgrey } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor={black}
              size={24}
              onPress={() => {
                copyToClipboard(username);
                Alert.alert("Copied Username to Clipboard!");
              }}
            />
          </View>
          <View style={stylesConfig.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Password"
                value={password}
                disabled={true}
                mode="flat"
                style={styles.resbox}
                theme={{ colors: { primary: inputgrey } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor={black}
              size={24}
              onPress={() => {
                copyToClipboard(password);
                Alert.alert("Copied Password to Clipboard!");
              }}
            />
          </View>
          <View style={stylesConfig.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Category"
                value={category}
                disabled={true}
                mode="flat"
                style={styles.resbox}
                theme={{ colors: { primary: inputgrey } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor={black}
              size={24}
              onPress={() => {
                copyToClipboard(category);
                Alert.alert("Copied to Clipboard!");
              }}
            />
          </View>
          <View style={stylesConfig.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Description"
                value={description}
                disabled={true}
                mode="flat"
                multiline={true}
                style={styles.resbox}
                theme={{ colors: { primary: inputgrey } }}
              />
            </View>
            <IconButton
              icon="content-copy"
              iconColor={black}
              size={24}
              onPress={() => {
                copyToClipboard(description);
                Alert.alert("Copied to Clipboard!");
              }}
            />
          </View>
          <View style={stylesConfig.hstack}>
            <View style={styles.smallinput1}>
              <TextInput
                label="Format"
                value={type}
                disabled={true}
                mode="flat"
                multiline={true}
                style={styles.resbox}
                theme={{ colors: { primary: inputgrey } }}
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
                theme={{ colors: { primary: inputgrey } }}
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
              theme={{ colors: { primary: inputgrey } }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              title="Clear"
              titleStyle={{
                color: white,
                fontSize: 18,
                fontWeight: "bold",
              }}
              buttonStyle={{
                backgroundColor: black,
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
  input: {
    marginTop: 5,
    fontSize: 14,
    width: "94%",
    marginLeft: "5%",
    borderRadius: 30,
    backgroundColor: "#f4f4f4",
  },
  searchstyle: {
    color: "#000",
    placeholderTextColor: black,
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
    width: "80%",
    marginLeft: "10%",
    borderRadius: 0,
    backgroundColor: white,
  },
});

export default QueryScreen;
