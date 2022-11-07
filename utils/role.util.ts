interface IRole {
  value: string;
  label: string;
}

export const roles: Array<IRole> = [
  { value: "Student", label: "Student" },
  { value: "Coordinator", label: "Coordinator" },
  { value: "Supervisor", label: "Supervisor" },
  { value: "Organisation", label: "Organisation" },
];

roles.sort();
