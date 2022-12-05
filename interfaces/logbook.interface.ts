export interface ILogbookSlice {
  __typename: "Logbook";
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

export type ILogbookSlices = ILogbookSlice[];
