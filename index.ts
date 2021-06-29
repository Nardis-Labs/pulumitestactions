import { ApplyRepos } from './repos';
import * as github from '@pulumi/github';
// import { teams } from "./teams"

const repos = ApplyRepos();

// const t = pulumi.output(teams)
