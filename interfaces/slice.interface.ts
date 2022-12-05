export interface IAuthStudSlice {
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
  eligible: boolean;
  supervisor: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
  }
  coordinator: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
  }
  organisation: {
    id: string;
    name: string;
    sector: string;
    email: string;    
    logo: string;
    address: string;
  }
}

export interface IAuthSupSlice {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  staffID: string;
  email: string;
  phone: string;
  user: string;
  avatar: string;
  institute: string;
  department: string;
  gender: string;
}

export interface IAuthOrganSlice {
  id: string;
  name: string;
  sector: string;
  phone: string;
  address: string;
  employees: string;
  email: string;
  password: string;
  logo: string;
  user: string;
}

export interface IEligibleSlice {
  id: string;
  institute: string;
  department: string;
  level: string;
  matricNo: string;
  isEligible: boolean,
  __typename: "Eligible";
}
