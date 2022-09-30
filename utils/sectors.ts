interface ISector {
  value: string;
  label: string;
}

export const sectors: Array<ISector> = [
    { value: "ICT", label: "Information Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Transportation", label: "Transportation" },
    { value: "Energy", label: "Energy" },
    { value: "Commercial", label: "Commercial" },
    { value: "Financial", label: "Financial Services" },
    { value: "Aviation", label: "Aviation" },
    { value: "Construction", label: "Construction" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Education", label: "Education & Training" },
    { value: "Fashion", label: "Fashion" },
    { value: "Logistics", label: "Logistics" },
    { value: "Tourism", label: "Tourism" },
    { value: "Telecommunication", label: "Telecommunication" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Consultancy", label: "Consultancy" },
    { value: "Religion", label: "Religion" },
    { value: "Others", label: "Others" },
    { value: "Oil", label: "Oil & Gas" },
  ];
  
  sectors.sort();