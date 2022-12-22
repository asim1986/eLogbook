export interface ChangePasswordType {
  user: string;
  style: any;
}

export interface ActivitiesType {
  style: any;
  styleHeader: any;
  user: string;
  isStudent?: boolean;
}

export interface BackBlurDropType {
  show: boolean;
  style?: boolean;
  isAdmin?: boolean;
  exit?: number;
}

export interface ListLogType {
  style: any;
  styleHeader: any;
  user: string;
  isAdmin?: boolean;
}

export interface DeleteAccountType {
  user: string;
  style: any;
}

export interface MainHeaderType {
  style: any;
  title: string;
}

export interface DeleteType {
  show: boolean;
  title: string;
  content: string;
  onYes: any;
}

interface LabelType {
  title: string;
  value: string;
}

export interface ViewDetailType {
  id?: string;
  show: boolean;
  labels: LabelType[];
  img: boolean;
  title: string;
  isAdmin?: boolean;
  onDelCallback?: (id: string) => void;
}

export interface EligiblebyDept {
  __typename: string;
  id: string;
  institute: string;
  department: string;
  level: string;
  supervisor: {
    __typename: string;
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  matricNo: string;
  createdAt: string;
}

export interface IViewEligible {
  show: boolean;
  isAdmin?: boolean;
  data: {
    id: string;
    matric: string;
    level: string;
    department: string;
    institution: string;
    supervisor: string;
    date: string;
  };
  onDelCallback: (id: string) => void;
}

export interface IAddEligible {
  show: boolean;
  isAdmin?: boolean;
}

export interface ITableData {
  id: string;
  matric: string;
  level: string;
  department: string;
  institution: string;
  supervisor: string;
  date: string;
}

export interface EventType {
  title: string;
  description: string;
  label: string;
  day: number;
  id: string;
  actId: string;
  diagram: boolean;
}

export interface StudLog {
  __typename: string;
  id: string;
  actId: string;
  day: string;
  title: string;
  description: string;
  label: string;
  diagram: string;
  approved: boolean;
  createdAt: string;
}
