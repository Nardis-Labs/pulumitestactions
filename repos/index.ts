import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';

import * as sweng from './sweng';
import { serialize } from '@pulumi/pulumi/runtime';

const defaultRepoSettings: github.RepositoryArgs = {
  archiveOnDestroy: true,
  deleteBranchOnMerge: true,
  hasDownloads: false,
  hasIssues: false,
  hasProjects: false,
  hasWiki: false,
  visibility: 'public',
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
    const slug = repo.slug?.toString() || '';

    const r = new github.Repository(`${repo.org}-${slug}`, {
      ...defaultRepoSettings,
      ...repo,
    });
    pulumi.all([r.id]).apply(([id]) => {
      new github.BranchProtection(`${slug}Main`, {
        ...defaultMainBranchProtection,
        ...repo.mainBranchProtection,
        ...{ repositoryId: id },
      });
      repo.branchProtections?.forEach((v, k) => {
        new github.BranchProtection(`${slug}${k}`, {
          ...v,
          ...{ repositoryId: id },
        });
      });
    });
    return r;
  });
}
