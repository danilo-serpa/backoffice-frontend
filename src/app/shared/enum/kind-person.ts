export enum KindPerson {
  physicalPerson = 1,
  legalPerson = 2
}

export const KindPersonLabel = new Map<number, string>([
  [KindPerson.physicalPerson, 'Pessoa física'],
  [KindPerson.legalPerson, 'Pessoa jurídica'],
]);
