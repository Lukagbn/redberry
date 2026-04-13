import React from "react";
import Online from "./Online";
import Calendar from "./Calendar";
import Hybrid from "./Hybrid";
import InPerson from "./InPerson";
import Marker from "./Marker";
import Clock from "./Clock";

function SessionIcons({ session }: { session: string }) {
  switch (session.toLowerCase()) {
    case "online":
      return <Online />;
    case "hybrid":
      return <Hybrid />;
    case "calendar":
      return <Calendar />;
    case "in_person":
      return <InPerson />;
    case "location":
      return <Marker />;
    case "clock":
      return <Clock />;
    default:
      return <Online />;
  }
}

export default SessionIcons;
