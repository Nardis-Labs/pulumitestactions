import { OrgName } from '../orgs';
import { ActionSecret } from './settings';
import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

const cfg = new pulumi.Config()

export const PulumiPassphraseSecret: ActionSecret = {
  pulumiSlug: 'pulumi-backend-passphrase',
  secretName: 'PULUMI_BACKEND_PASSPHRASE',
  plaintextValue: cfg.require("dbPassword"),
  repository: 'pulumi-test-updated',
  org: OrgName.StackPath
};

export default [PulumiPassphraseSecret];
