import { ApplyRepos } from './repos';
import { ApplyActionSecrets } from './actionssecrets';
import * as github from '@pulumi/github';
// import { teams } from "./teams"

const actionSecrets = ApplyActionSecrets();
const repos = ApplyRepos();

// const t = pulumi.output(teams)
