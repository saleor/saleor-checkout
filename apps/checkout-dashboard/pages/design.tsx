import DesignDetails from "@templates/DesignDetails";
import { useDesignOptionList } from "api/app/api";

export default function Design() {
  const options = useDesignOptionList();

  return <DesignDetails options={options} />;
}
