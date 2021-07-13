import { OrgName } from '../orgs';
import { ActionSecret } from './settings';
import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

const cfg = new pulumi.Config()

export const PulumiPassphraseSecret: ActionSecret = {
  pulumiSlug: 'pulumi-backend-passphrase',
  secretName: 'PULUMI_BACKEND_PASSPHRASE_FUNTIMES',
  plaintextValue: cfg.requireSecret("dbPassword"),
  repository: 'pulumitestactions',
  org: OrgName.StackPath
};

export const Test2: ActionSecret = {
  pulumiSlug: 'test2',
  secretName: 'TEST_2',
  plaintextValue: cfg.requireSecret("dbPassword"),
  repository: 'pulumitestactions',
  org: OrgName.StackPath
};

export const Test3: ActionSecret = {
  pulumiSlug: 'test3',
  secretName: 'TEST_3',
  plaintextValue: cfg.requireSecret("dbPassword"),
  repository: 'pulumitestactions',
  org: OrgName.StackPath
};

export default [PulumiPassphraseSecret, Test3];
