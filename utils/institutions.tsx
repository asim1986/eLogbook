import InstitutionsList from "../institutions.json";
interface InstituteType {
  [key: string]: { [key: string]: string };
}

export const allInstitutions: string[] = [];

InstitutionsList.map((institute) => {
    const inst: InstituteType = institute;
    for (let s in inst) {
      for (let t in inst[s]) {
        allInstitutions.push(inst[s][t]);
      }
    }
    allInstitutions.sort()
});