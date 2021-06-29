import { OrgName } from '../orgs';
import { Repository } from './settings';

export const PulumiTest: Repository = {
  name: 'pulumi-test',
  slug: 'pulumi-test-updated',
  org: OrgName.StackPath,
  description: 'pulumi test existing',
  topics: ['pulumi'],
};

export default [PulumiTest];
