module.exports = [
  {
    id: 1,
    name: "Court",
    friendlyName: "Court",
    description: "A group of apartments",
    isIndependentCluster: true,
    canHaveResidentAccount: true,
  },
  {
    id: 2,
    name: "MZone",
    friendlyName: "Mansionette",
    description: "A mansionette zone",
    isIndependentCluster: false,
    canHaveResidentAccount: true,
  },
  {
    id: 3,
    name: "Commercial",
    friendlyName: "Commercial",
    description: "A collection of commercial properties clustered together",
    isIndependentCluster: true,
    canHaveResidentAccount: false,
  },
];
