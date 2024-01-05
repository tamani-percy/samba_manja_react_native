import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";
import { IconButton } from "../components";
import Firebase from "../config/firebase";
import Button from "../components/Button";
import { DataTable } from "react-native-paper";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { ScrollView } from "react-native-gesture-handler";
const auth = Firebase.auth();
export default function HomeScreen({ navigation }) {
  const [dayrecents, DayRecents] = useState([]);
  const [monthrecents, MonthRecents] = useState([]);
  const [weekrecents, WeekRecents] = useState([]);
  const recentsDay = () => {
    return fetch("https://samba-app-server.onrender.com/recents-day")
      .then((response) => response.json())
      .then((data) => DayRecents(data));
  };
  const recentsMonth = () => {
    fetch("https://samba-app-server.onrender.com/recents-month")
      .then((response) => response.json())
      .then((data) => MonthRecents(data));
  };
  const recentsWeek = () => {
    fetch("https://samba-app-server.onrender.com/recents-week")
      .then((response) => response.json())
      .then((data) => WeekRecents(data));
  };

  const [greet, setGreet] = useState("");
  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    findGreet();
    recentsWeek();
    recentsDay();
    recentsMonth();
  }, []);
  const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    setDate(date);
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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 12,
      }}
    >
      <StatusBar style="dark-content" />
      <View style={{ alignItems: "flex-end" }}>
        <IconButton
          name="logout"
          size={24}
          color="green"
          onPress={handleSignOut}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      ></View>
      <View>
        <Text
          style={{ textAlign: "center", fontSize: 50, fontWeight: "bold" }}
        ></Text>
      </View>
      <View
        style={{
          backgroundColor: "red",
          height: 100,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "red",
            fontSize: 34,
            fontWeight: "600",
            color: "white",
          }}
        >
          {`Good ${greet}`}!!
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          margin: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Daily Entries</Text>

        <DataTable style={{ backgroundColor: "orange" }}>
          <DataTable.Header>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Day This Month
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Entries
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        {dayrecents.map((_user) => (
          <DataTable style={{ backgroundColor: "orange" }}>
            <DataTable.Row>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {_user.day}
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {_user.number_of_users}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
      </View>
      <View
        style={{ alignItems: "center", flexDirection: "column", margin: 5 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Week This Year</Text>

        <DataTable style={{ backgroundColor: "orange" }}>
          <DataTable.Header>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Day This Month
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Entries
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        {weekrecents.map((_user) => (
          <DataTable style={{ backgroundColor: "orange" }}>
            <DataTable.Row>
              <DataTable.Cell
                style={{ justifyContent: "center" }}
              ></DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {_user.number_of_users}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
      </View>
      <View
        style={{ alignItems: "center", flexDirection: "column", margin: 5 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Monthly Entries
        </Text>

        <DataTable style={{ backgroundColor: "orange" }}>
          <DataTable.Header>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Day This Month
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              Entries
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        {monthrecents.map((_user) => (
          <DataTable style={{ backgroundColor: "orange" }}>
            <DataTable.Row>
              <DataTable.Cell
                style={{ justifyContent: "center" }}
              ></DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: "center" }}>
                {_user.number_of_users}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Button
          title={"View Recents??"}
          onPress={() => navigation.navigate("Recents")}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
