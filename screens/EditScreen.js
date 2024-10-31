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
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";

import { stylesConfig } from "../utils/styleConfig";
import { white, black, inputgrey, copyToClipboard } from "../utils/config";

const EditScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [text, setText] = React.useState("Edit Entry");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [type, settype] = React.useState("Final");
  const [updated, setUpdated] = React.useState(""); //to handle last updated
  const [recur, setrecur] = React.useState(""); //to handle the password expiry status
  const [loading, setLoading] = React.useState(false); //to handle loading effect
  const [stat, setstat] = React.useState(false); //to handle status of search
  const [auth, setAuth] = React.useState(""); //to handle confirmation password while deleting
  const [isModalVisible, setIsModalVisible] = React.useState(false); //to handle delete popup
  let deviceId = Device.designName;

  function handleupdate() {
    //when update is clicked without searching anything alert the user
    if (stat === true) {
      //when username,password are empty
      if (username === "" || password === "") {
        alert("Please fill in all the * fields.");
        return;
      } else if (category === "" || description === "") {
        //when cat,description are left blank
        setCategory("Work");
        setDescription("Nil");
        handleUpdate();
      } else {
        handleUpdate();
      }
    } else {
      Alert.alert("Please search before proceeding");
    }
  }

  function handledel() {
    //to handle delete operation when search is performed already
    //popup a confirmation alert
    if (stat === true) {
      Alert.alert(
        "Delete Entry",
        "Are you sure you want to delete " + text + "?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setIsModalVisible(true);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Please search before proceeding");
    }
  }

  const handlePasswordSubmit = () => {
    //when password is entered after confirmation
    if (auth === "**********") {
      setIsModalVisible(false);
      setAuth("");
      handleDelete();
      setstat(false);
    } else {
      Alert.alert(
        "Incorrect Password",
        "Please enter the correct password to delete the entry."
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAuth("");
  };

  const handleclr = () => {
    setLoading(false);
    setstat(false);
    setText("Edit Entry");
    setSearchQuery("");
    setUsername("");
    setPassword("");
    setCategory("");
    setDescription("");
    settype("");
    setUpdated("");
    setrecur("");
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
    <View style={stylesConfig.container}>
      <ScrollView contentContainerStyle={stylesConfig.scrollContent}>
        <View style={stylesConfig.titlecontainer}>
          <Icon name="lock-outline" size={40} color={black} />
          <Text style={stylesConfig.title}>Password Manager</Text>
        </View>
        <Card style={stylesConfig.card}>
          <View style={stylesConfig.entryContainer}>
            <Icon name="database-edit" size={35} color={black} />
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
              setText("Edit Entry");
            }}
            style={styles.input}
            inputStyle={styles.searchstyle}
            iconColor={black}
            clearIconColor={black}
            elevation={2}
          />
          <View style={stylesConfig.hstack}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Username*"
                value={username}
                mode="flat"
                placeholder="Username/Email"
                maxLength={30}
                onChangeText={(text) => setUsername(text)}
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
                label="Password*"
                value={password}
                mode="flat"
                maxLength={32}
                placeholder="password/[dd/mm/yyyy]"
                onChangeText={(text) => setPassword(text)}
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
                mode="flat"
                placeholder="Work/Personal"
                maxLength={20}
                onChangeText={(text) => setCategory(text)}
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
                mode="flat"
                maxLength={60}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                style={styles.resbox}
                underlineColor="transparent"
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
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={type}
                style={styles.dropdown}
                onValueChange={(itemValue) => settype(itemValue)}
              >
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
          <View style={stylesConfig.hstack}>
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
                marginLeft: 25,
              }}
              containerStyle={{
                width: 120,
              }}
              onPress={handleclr}
            />
            <IconButton
              icon="delete"
              iconColor={black}
              size={40}
              onPress={handledel}
              style={{ marginTop: 20, marginLeft: 12, marginRight: 8 }}
            />
            <Button
              title="Update"
              titleStyle={{
                color: white,
                fontSize: 18,
                fontWeight: "bold",
              }}
              buttonStyle={{
                backgroundColor: black,
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
              underlineColor="transparent"
              onChangeText={setAuth}
            />
            <View style={stylesConfig.hstack}>
              <Button
                title="Cancel"
                titleStyle={{
                  color: black,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                buttonStyle={{
                  backgroundColor: "transparent",
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
                  color: black,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                buttonStyle={{
                  backgroundColor: "transparent",
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
  input: {
    marginTop: 5,
    fontSize: 14,
    width: "94%",
    marginLeft: "5%",
    borderRadius: 30,
    backgroundColor: white,
  },
  pinput: {
    marginTop: 5,
    fontSize: 14,
    width: "100%",
    marginLeft: "7%",
    borderRadius: 25,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  searchstyle: {
    color: black,
    placeholderTextColor: black,
  },
  inputContainer: {
    width: 250,
    height: 60,
  },
  dropdownContainer: {
    width: 120,
    height: 50,
    marginLeft: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: inputgrey,
    borderRadius: 5,
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
    borderRadius: 15,
    backgroundColor: white,
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default EditScreen;
