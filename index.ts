import { ApplyRepos } from './repos';
import { ApplyActionSecrets } from './actions';
import * as github from '@pulumi/github';
// import { teams } from "./teams"

const repos = ApplyRepos();
const actionSecrets = ApplyActionSecrets();

// const t = pulumi.output(teams)
