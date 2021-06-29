// For permissions see https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/repository-permission-levels-for-an-organization
export enum Permission {
  Read = 'pull',
  Triage = 'triage',
  Write = 'push',
  Maintain = 'maintain',
  Admin = 'admin',
}
