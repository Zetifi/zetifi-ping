import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Circle, Marker } from "react-native-maps";
import { Context as LocationContext } from "../../state/LocationContext";
import { COLORS } from "../../constants";
const Color = require("color");

const LogMarker = (props) => {
  return (
    <>
      <Marker
        coordinate={{
          latitude: props.latitude,
          longitude: props.longitude,
        }}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <MaterialIcons
          name="circle"
          size={10}
          color={
            props.latest
              ? COLORS.blue
              : Color(COLORS.blue).alpha(0.2).rgb().string()
          }
        />
      </Marker>
    </>
  );
};

export default (props) => {
  return (
    <>
      {props.log.map((entry, i) => {
        return (
          <LogMarker
            key={i}
            latest={props.latest}
            latitude={entry.location.coords.latitude}
            longitude={entry.location.coords.longitude}
          />
        );
      })}
    </>
  );
};
