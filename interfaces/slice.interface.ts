export interface IAuthSlice {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  matricNo: string;
  phone: string;
  level: string;
  user: string;
  avatar: string;
  address: string;
  institute: string;
  department: string;
  gender: string;
  place: string;
  eligible: string;
}

export interface IEligibleSlice {
  id: string;
  institute: string;
  department: string;
  level: string;
  matricNo: string;
  __typename: "Eligible";
}
