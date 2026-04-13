"use client";
import Business from "@/components/Icons/Business";
import DataScience from "@/components/Icons/DataScience";
import Design from "@/components/Icons/Design";
import Development from "@/components/Icons/Development";
import Marketing from "@/components/Icons/Marketing";
import { useState } from "react";

function CourseIcons({ icon, hovered }: { icon: string; hovered: boolean }) {
  const fill = hovered ? "#4F46E5" : "#525252";
  switch (icon.toLocaleLowerCase()) {
    case "development":
      return <Development fill={fill} />;
    case "marketing":
      return <Marketing fill={fill} />;
    case "business":
      return <Business fill={fill} />;
    case "design":
      return <Design fill={fill} />;
    case "data science":
      return <DataScience fill={fill} />;
    default:
      return <Development fill={fill} />;
  }
}

export default CourseIcons;
