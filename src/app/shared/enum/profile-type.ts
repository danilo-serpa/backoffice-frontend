export enum ProfileType {
  client = 1,
  supplier = 2,
  collaborator = 3,
}

export const ProfileTypeLabel = new Map<number, string>([
  [ProfileType.client, 'Cliente'],
  [ProfileType.supplier, 'Fornecedor'],
  [ProfileType.collaborator, 'Colaborador'],
]);
