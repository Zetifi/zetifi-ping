import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Circle, Marker } from "react-native-maps";
import { Context as LocationContext } from "../../state/LocationContext";
import { COLORS } from "../../constants";
const Color = require("color");
import { wasPingDropped } from "../../logUtils";

const LogMarker = (props) => {
  let color = wasPingDropped(props.entry.ping) ? COLORS.errorRed : COLORS.blue;

  return (
    <>
      <Marker
        coordinate={{
          latitude: props.entry.location.coords.latitude,
          longitude: props.entry.location.coords.longitude,
        }}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <MaterialIcons
          name="circle"
          size={10}
          color={props.latest ? color : Color(color).alpha(0.5).rgb().string()}
        />
      </Marker>
    </>
  );
};

export default (props) => {
  return (
    <>
      {props.log.map((entry, i) => {
        return <LogMarker key={i} latest={props.latest} entry={entry} />;
      })}
    </>
  );
};
