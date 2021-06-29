import * as github from '@pulumi/github';
import { Permission } from './github';
import { Repository } from './repos/settings';
import * as sweng from './repos/sweng';

interface Team extends github.TeamArgs {
  groups?: string[];
  parent?: Team;
  repositories?: Map<string, Permission>;
  users?: string[];
}

/**
 * IMPORTANT! Teams inherit access from their parent
 */

export const allEmployees: Team = {
  name: 'all-employees',
};

// Engineering
const engineering: Team = {
  name: 'eng',
  parent: allEmployees,
  // groups: [
  //   'dept-coredevelopment',
  //   'dept-reliability-engineering',
  //   'software-dev',
  // ],
  repositories: repoAccess(sweng.default, Permission.Write),
};

// Software Eng
const softwareEngineering: Team = {
  name: 'software-eng',
  parent: engineering,
};

const swEngRepoApprovers: Team = {
  name: 'sweng-repo-approvers',
  parent: softwareEngineering,
  users: ['sullivtr'], // TODO(sullivtr) create an AD group for this?
};


const platformDev: Team = {
  name: 'platform-dev',
  parent: softwareEngineering,
  groups: ['dept-product-dev'],
};

export default [
  allEmployees,
  engineering,
  softwareEngineering,
  swEngRepoApprovers,
  platformDev,
];

// A closed team is visible to all members of the organization
// See: https://docs.github.com/en/rest/reference/teams#create-a-team--parameters
// const closedTeam = "closed";

// const pulumiTest = new github.Team("pulumi-test", {
//   description: "Test Team",
//   privacy: closedTeam,
// });

// const childTeam = new github.Team("pulumi-child-test", {
//   description: "child team",
//   privacy: closedTeam,
//   parentTeamId: pulumiTest.id.apply(v => Number(v)),
// })

// export const teams: Array<github.Team> = [
//   pulumiTest,
//   childTeam,
// ];

function repoAccess(
  repos: Repository[],
  perm: Permission
): Map<string, Permission> {
  return new Map(repos.map((v) => [v.name, perm]));
}
