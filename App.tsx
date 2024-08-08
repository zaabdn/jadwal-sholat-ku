/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import HomeScreen from "./src/screens/home";
import React, { useCallback, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import firebase from "@react-native-firebase/app";

import { FIREBASE_APPID, FIREBASE_KEY, FIREBASE_DATABASE_URL } from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  // authDomain: "jadwalsholatku-34989.firebaseapp.com",
  projectId: "jadwalsholatku-34989",
  storageBucket: "jadwalsholatku-34989.appspot.com",
  messagingSenderId: "799034507658",
  appId: FIREBASE_APPID,
  measurementId: "",
  databaseURL: FIREBASE_DATABASE_URL,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const loadData = useCallback(async () => {
  //   try {
  //     const db = await connectToDatabase();
  //     await createDatabases(db);
  //   } catch (error) {
  //     console.log("loadData", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}> */}
      <HomeScreen />
      {/* <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your
            edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
        </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
