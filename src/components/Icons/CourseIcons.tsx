"use client";
import Business from "@/components/Icons/Business";
import DataScience from "@/components/Icons/DataScience";
import Design from "@/components/Icons/Design";
import Development from "@/components/Icons/Development";
import Marketing from "@/components/Icons/Marketing";
import { useState } from "react";

function CourseIcons({ icon }: { icon: string }) {
  const [hovered, setHovered] = useState(false);

  switch (icon.toLocaleLowerCase()) {
    case "development":
      return <Development />;
    case "marketing":
      return <Marketing />;
    case "business":
      return (
        <Business
          fill={hovered ? "#4F46E5" : "#525252"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      );
    case "design":
      return <Design />;
    case "data science":
      return <DataScience />;
    default:
      return <Development />;
  }
}

export default CourseIcons;
