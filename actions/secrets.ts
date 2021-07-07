import { OrgName } from '../orgs';
import { ActionSecret } from './settings';

export const PulumiPassphraseSecret: ActionSecret = {
  pulumiSlug: 'pulumi-backend-passphrase',
  secretName: 'PULUMI_BACKEND_PASSPHRASE',
  plaintextValue: 'test',
  repository: 'admin',
  org: OrgName.StackPath
};

export default [PulumiPassphraseSecret];
