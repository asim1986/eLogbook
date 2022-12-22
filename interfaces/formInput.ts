export interface IFormInput {
  isAdmin: boolean;
  isSupervisor?: boolean;
  btnTitle: string;
  data?: {
    __typename: string;
    id: string;
    matricNo: string;
    level: string;
    department: string;
    institute: string;
  };
}
