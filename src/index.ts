/** @format */
import pkg from '../package.json';
import { ERegistry } from './template';
import yParser from 'yargs-parser';
import { getGitInfo } from './utils';
import { dirname, join } from 'path';
import * as clackPrompts from '@clack/prompts';
import chalk from 'chalk';
enum ENpmClient {
  npm = 'npm',
  cnpm = 'cnpm',
  tnpm = 'tnpm',
  yarn = 'yarn',
  pnpm = 'pnpm',
}
enum ETemplate {
  cms = 'cms',
}
interface ITemplateArgs {
  template?: string;
}
interface IArgs extends yParser.Arguments, ITemplateArgs {
  default?: boolean;
  git?: boolean;
  install?: boolean;
}

interface ITemplateParams {
  name?: string;
  version: string;
  npmClient: ENpmClient;
  registry: string;
  author: string;
  email: string;
  withHusky: boolean;
  extraNpmrc: string;
}

export interface IDefaultData extends ITemplateParams {
  appTemplate?: ETemplate;
}
const DEFAULT_DATA = {
  name: 'create-dnk-cms',
  email: '1604549268@qq.com',
  author: 'dnk',
  version: pkg.version,
  npmClient: ENpmClient.npm,
  registry: ERegistry.npm,
  withHusky: false,
  extraNpmrc: '',
  appTemplate: ETemplate.cms,
} satisfies IDefaultData;
interface IGeneratorOpts {
  cwd: string;
  args: IArgs;
  defaultData?: IDefaultData;
}

export default async ({
  cwd,
  args,
  defaultData = DEFAULT_DATA,
}: IGeneratorOpts) => {
  let [name] = args._;
  let npmClient = ENpmClient.pnpm;
  let registry = ERegistry.npm;
  let appTemplate = defaultData?.appTemplate || ETemplate.cms;

  const { username, email } = await getGitInfo();

  const author = email && username ? `${username} <${email}>` : '';

  let pluginName = `dnk-plugin-${name || 'demo'}`;

  const target = name ? join(cwd, name + '') : cwd;
  const { isCancel, text, select, intro, outro } = clackPrompts;

  const exitPrompt = () => {
    outro(chalk.red('Exit create-umi'));
    process.exit(1);
  };
};
