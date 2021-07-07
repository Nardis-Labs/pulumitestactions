import { ApplyRepos } from './repos';
import { ApplyActionSecrets } from './actions';
import * as github from '@pulumi/github';
// import { teams } from "./teams"

const actionSecrets = ApplyActionSecrets();
const repos = ApplyRepos();

// const t = pulumi.output(teams)
