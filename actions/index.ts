import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import * as secrets from './secrets';

export function ApplyActionSecrets() {
    return secrets.default.map((secret) => {
      const slug = secret.pulumiSlug?.toString() || '';
  
      const s = new github.ActionsSecret(`${secret.org}-${slug}`, {
        ...secret,
      });
      return s;
    });
  }