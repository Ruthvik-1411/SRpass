import { StyleSheet } from "react-native";

import { windowWidth, windowHeight } from "./config";

export const stylesConfig = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titlecontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
		top: 10
  },
	loadercontainer: {
		marginTop: 1,
		marginLeft: 5
	},
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
    padding: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hstack: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
  },
  entryTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
