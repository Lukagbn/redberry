import React from "react";
import Morning from "./Morning";
import Afternoon from "./Afternoon";
import Evening from "./Evening";

function DayTime({ dayTime }: { dayTime: string }) {
  switch (dayTime.toLowerCase()) {
    case "morning":
      return <Morning />;
    case "afternoon":
      return <Afternoon />;
    case "evening":
      return <Evening />;
  }
}

export default DayTime;
