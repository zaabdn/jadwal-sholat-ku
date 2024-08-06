import { SwipeablePanel } from "../components/swipeable";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { WidgetPreview } from "react-native-android-widget";
import ListScheduleWidget from "../widgets/ListScheduleWidget";

const HomeScreen = () => {
  const [city, setCity] = useState([]);
  const [showCity, setShowCity] = useState(false);
  const [scheduleSholat, setScheduleSholat] = useState(null);

  const fetchAllCity = () => {
    fetch("https://api.myquran.com/v2/sholat/kota/cari/jakarta")
      .then((res) => res.json())
      .then((result) => {
        setCity(result.data);
        fetchScheduleSholat();
      })
      .catch((err) => console.log("err", err));
  };

  const fetchScheduleSholat = () => {
    fetch(`https://api.myquran.com/v2/sholat/jadwal/${city?.[0]?.id}/2024-08-06`)
      .then((res) => res.json())
      .then((result) => {
        console.log("fetchScheduleSholat", result);
        // setCity(result.data);
        setScheduleSholat(result.data);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchAllCity();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, height: Dimensions.get("screen").height }}>
      <WidgetPreview
        renderWidget={() => <ListScheduleWidget />}
        onClick={(props) => {}}
        height={150}
        width={Dimensions.get("screen").width - 20}
      />

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity onPress={() => setShowCity(true)} style={{ padding: 10, borderWidth: 1, borderRadius: 10 }}>
          <Text>City</Text>
        </TouchableOpacity>
      </View>

      {!!scheduleSholat && (
        <View>
          <View>
            <Text>Subuh: {scheduleSholat?.jadwal?.subuh}</Text>
            <Text>Dhuha: {scheduleSholat?.jadwal?.dhuha}</Text>
            <Text>Dzuhur: {scheduleSholat?.jadwal?.dzuhur}</Text>
            <Text>Ashar: {scheduleSholat?.jadwal?.ashar}</Text>
            <Text>Maghrib: {scheduleSholat?.jadwal?.maghrib}</Text>
            <Text>Isya: {scheduleSholat?.jadwal?.isya}</Text>
          </View>
        </View>
      )}

      <SwipeablePanel
        isActive={showCity}
        onClose={() => setShowCity(false)}
        closeOnTouchOutside={true}
        fullWidth={true}>
        {/* <ListCity /> */}
        {/* {city.map((item) => (
          <TouchableOpacity key={item.id} style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text>{item.lokasi}</Text>
          </TouchableOpacity>
        ))} */}
      </SwipeablePanel>
    </SafeAreaView>
  );
};

export default HomeScreen;
