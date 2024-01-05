import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "../components";
import Firebase from "../config/firebase";
import { DataTable } from "react-native-paper";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { ScrollView } from "react-native-gesture-handler";
const auth = Firebase.auth();
export default function Recents() {
  const [usersData, setUsersData] = useState([]);

  const getData = () => {
    try {
      fetch("https://samba-app-server.onrender.com/users")
        .then((response) => response.json())
        .then((data) => setUsersData(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={{ alignItems: "flex-end" }}>
        <IconButton
          name="logout"
          size={24}
          color="green"
          onPress={handleSignOut}
        />
      </View>
      <View>
        <Text
          style={{ textAlign: "center", fontSize: 50, fontWeight: "bold" }}
        ></Text>
      </View>
      <ScrollView>
        <View>
          <View>
            <DataTable style={{ backgroundColor: "orange" }}>
              <DataTable.Header>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  Sanitiser Type
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  Temperature
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  Timestamp
                </DataTable.Title>
              </DataTable.Header>
            </DataTable>
          </View>
          {usersData.map((_user) => (
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>{_user.sanitiser}</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  {_user.temp} ℃
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  {_user.time}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "black",
  },
});
