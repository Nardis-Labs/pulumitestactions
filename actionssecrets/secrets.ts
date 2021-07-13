import { OrgName } from '../orgs';
import { ActionSecret } from './settings';
import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

const cfg = new pulumi.Config()

export const PulumiPassphraseSecret: ActionSecret = {
  pulumiSlug: 'pulumi-backend-passphrase',
  secretName: 'PULUMI_BACKEND_PASSPHRASE_FUNTIMES',
  plaintextValue: cfg.require("dbPassword"),
  repository: 'pulumitestactions',
  org: OrgName.StackPath
};

export default [PulumiPassphraseSecret];
