import Business from "@/components/Icons/Business";
import DataScience from "@/components/Icons/DataScience";
import Design from "@/components/Icons/Design";
import Development from "@/components/Icons/Development";
import Marketing from "@/components/Icons/Marketing";

export function courseIcons(icon: string) {
  switch (icon.toLocaleLowerCase()) {
    case "development":
      return <Development />;
    case "marketing":
      return <Marketing />;
    case "business":
      return <Business />;
    case "design":
      return <Design />;
    case "data science":
      return <DataScience />;
    default:
      return <Development />;
  }
}
