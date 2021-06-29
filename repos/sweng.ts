import { OrgName } from '../orgs';
import { Repository } from './settings';

export const PulumiTest: Repository = {
  name: 'pulumi-test-update',
  org: OrgName.StackPath,
  description: 'pulumi test existing',
  topics: ['pulumi'],
};

export default [PulumiTest];
