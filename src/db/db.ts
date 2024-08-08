import database from "@react-native-firebase/database";
import firebase from "@react-native-firebase/app";

export const getLocation = async () => {
  try {
    const data = await database().ref("location").once("value");

    return data.val();
  } catch (error) {
    console.log("getLocation", error);
    return [];
  }
};
