import DesignDetails from "@templates/DesignDetails";

export default function Design() {
  const options = [
    { id: "1", name: "Branding" },
    { id: "2", name: "Layout" },
    { id: "3", name: "Sections" },
  ];

  return <DesignDetails options={options} />;
}
