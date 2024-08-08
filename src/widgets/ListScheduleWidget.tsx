import { COLORS } from "../utils/colors";
import React from "react";
import { Dimensions } from "react-native";
import { FlexWidget, IconWidget, ListWidget, TextWidget } from "react-native-android-widget";

const ListScheduleWidget = () => {
  const data = [
    {
      id: 1,
      name: "Subuh",
    },
    {
      id: 2,
      name: "Dzuhur",
    },
    {
      id: 3,
      name: "Ashar",
    },
    {
      id: 4,
      name: "Maghrib",
    },
    {
      id: 5,
      name: "Isya",
    },
  ];

  return (
    <FlexWidget
      style={{
        height: 100,
        width: "match_parent",
        backgroundColor: "#528974",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 16,
        borderRadius: 16,
      }}>
      <ListWidget
        style={{
          height: "match_parent",
          backgroundColor: "#0000",
        }}>
        <FlexWidget
          style={{
            backgroundColor: "#528974",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "match_parent",
          }}>
          {data.map((_, i) => (
            <FlexWidget
              style={{
                width: (Dimensions.get("screen").width - 40) / 5,
                // backgroundColor: "#4D6357",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 4,
                paddingHorizontal: 8,
                marginVertical: 4,
                borderRadius: 16,
              }}
              key={i}
              clickAction="OPEN_URI"
              clickActionData={{
                uri: `androidwidgetexample://list/list-demo/${i + 1}`,
              }}>
              <FlexWidget
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <TextWidget
                  text={_.name}
                  style={{
                    fontSize: 16,
                    color: "#ffffff",
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    textAlign: "center",
                  }}
                />
                <TextWidget
                  text={`20.00`}
                  style={{
                    fontSize: 12,
                    color: "#ffffff",
                    fontFamily: "Roboto",
                    textAlign: "center",
                  }}
                />
              </FlexWidget>
              {/* <IconWidget
                icon={i % 2 == 0 ? "unarchive" : "archive"}
                size={24}
                font={i % 2 == 0 ? "material" : "material_outlined"}
                style={{ color: "#fff" }}
                clickAction="ARCHIVE"
                clickActionData={{ listItemId: i }}
              /> */}
            </FlexWidget>
          ))}
        </FlexWidget>
      </ListWidget>
    </FlexWidget>
  );
};

export default ListScheduleWidget;
