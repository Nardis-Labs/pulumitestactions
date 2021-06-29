import * as github from '@pulumi/github';
import { OrgName } from '../orgs';

export interface Repository extends github.RepositoryArgs {
  name: string;
  org: OrgName;
  mainBranchProtection?: github.BranchProtectionArgs;
  branchProtections?: Map<string, github.BranchProtectionArgs>;
}
