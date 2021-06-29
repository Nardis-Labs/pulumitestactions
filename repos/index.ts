import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';

import * as sweng from './sweng';
import { serialize } from '@pulumi/pulumi/runtime';

const defaultRepoSettings: github.RepositoryArgs = {
  archiveOnDestroy: true,
  hasDownloads: false,
  hasIssues: false,
  hasProjects: false,
  hasWiki: false,
  visibility: 'private',
  vulnerabilityAlerts: true,
};

const defaultMainBranchProtection: github.BranchProtectionArgs = {
  repositoryId: '', // Required by type
  pattern: 'master',
  enforceAdmins: true,
  allowsDeletions: false,
  // requiredStatusChecks: [{
  //     strict: false,
  //     contexts: ["ci/travis"],
  // }],
  requiredPullRequestReviews: [
    {
      requireCodeOwnerReviews: true,
    },
  ],
};

export function ApplyRepos() {
  return sweng.default.map((repo) => {
    const name = repo.name?.toString() || ''; // TODO(sullivtr) get some validation before this to enforce a name

    const r = new github.Repository(`${repo.org}-${name}`, {
      ...defaultRepoSettings,
      ...repo,
    });
    pulumi.all([r.id, r.name]).apply(([id, name]) => {
      new github.BranchProtection(`${name}Main`, {
        ...defaultMainBranchProtection,
        ...repo.mainBranchProtection,
        ...{ repositoryId: id },
      });
      repo.branchProtections?.forEach((v, k) => {
        new github.BranchProtection(`${name}${k}`, {
          ...v,
          ...{ repositoryId: id },
        });
      });
    });
    return r;
  });
}
