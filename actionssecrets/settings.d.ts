import * as github from '@pulumi/github';
import { OrgName } from '../orgs';

export interface ActionSecret extends github.ActionsSecretArgs {
  pulumiSlug: string;
  org: OrgName;
}
