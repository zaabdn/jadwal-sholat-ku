import BottomSheet from "../components/swipeable";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { WidgetPreview } from "react-native-android-widget";
import ListScheduleWidget from "../widgets/ListScheduleWidget";
import { getLocation } from "../db/db";

import { COLORS } from "../utils/colors";

type CityProps = {
  id: string;
  name: string;
};

const HomeScreen = () => {
  const [listCity, setListCity] = useState([]);
  const [showCity, setShowCity] = useState(false);
  const [scheduleSholat, setScheduleSholat] = useState(null);
  const [selectedCity, setSelectedCity] = useState<CityProps>({ name: "", id: "" });
  const [search, setSearch] = useState<string>("");

  const fetchAllCity = () => {
    fetch("https://api.myquran.com/v2/sholat/kota/semua")
      .then((res) => res.json())
      .then((result) => {
        setListCity(result.data);
      })
      .catch((err) => console.log("err", err));
  };

  const fetchLocation = async () => {
    const location = await getLocation();

    setSelectedCity({ id: location.cityCode, name: "" });
  };

  const fetchScheduleSholat = () => {
    fetch(`https://api.myquran.com/v2/sholat/jadwal/${parseInt(selectedCity.id)}/2024-08-06`)
      .then((res) => res.json())
      .then((result) => {
        console.log("schedule", result.data);
        setScheduleSholat(result.data);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchAllCity();
    fetchLocation();
  }, []);

  useEffect(() => {
    fetchScheduleSholat();
  }, [selectedCity]);

  const handleSearch = (input: string) => {
    setSearch(input);

    if (!!input) {
      setTimeout(() => {
        fetch(`https://api.myquran.com/v2/sholat/kota/cari/${input}`)
          .then((res) => res.json())
          .then((result) => {
            setListCity(result.data);
          })
          .catch((err) => console.log("err", err));
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={{ height: Dimensions.get("screen").height }}>
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <TouchableHighlight
          onPress={() => {
            setShowCity(true);
          }}
          style={{ borderRadius: 24, backgroundColor: COLORS.BLACK, padding: 10, width: "36%" }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/icons/location.png")} style={{ width: 24, height: 24, marginRight: 3 }} />
            <Text style={{ color: COLORS.WHITE }} numberOfLines={1}>
              {!!selectedCity.name ? selectedCity.name : "Select City"}
            </Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <WidgetPreview
          renderWidget={() => <ListScheduleWidget />}
          onClick={(props) => {}}
          height={150}
          width={Dimensions.get("window").width - 40}
        />
      </View>

      <BottomSheet isVisible={showCity} onClose={() => setShowCity(false)}>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <TextInput placeholder="Cari.." value={search} onChangeText={handleSearch} />

            {listCity.slice(0, 30).map((item, i) => (
              <TouchableHighlight
                underlayColor={COLORS.PRIMARY}
                onPress={() => {
                  setSelectedCity({ id: item.id, name: item.lokasi });
                  setShowCity(false);
                }}
                key={i}
                style={{
                  paddingVertical: 10,
                  paddingLeft: 5,
                  marginTop: 10,
                  backgroundColor: selectedCity.id == item.id ? COLORS.PRIMARY : COLORS.BACKGROUND,
                  borderRadius: 6,
                }}>
                <Text style={{ color: selectedCity.id == item.id ? COLORS.WHITE : COLORS.BLACK }}>{item.lokasi}</Text>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
