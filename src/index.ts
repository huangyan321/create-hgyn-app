/** @format */
import pkg from '../package.json';
import { ERegistry } from './template';
import yParser from 'yargs-parser';
import { getGitInfo } from './utils';
import { dirname, join } from 'path';
import * as clackPrompts from '@clack/prompts';
import { execa } from 'execa';
import chalk from 'chalk';
import { existsSync } from 'fs';
import fsExtra from 'fs-extra';
import BaseGenerator from './utils/BaseGenerator/BaseGenerator';
import cs from 'cross-spawn';
import semver from 'semver';
import { fileURLToPath } from 'url';
import { ETemplate, internalTemplate } from './template';
interface IContext {
  projectRoot: string;
  inMonorepo: boolean;
  target: string;
}
export type NpmClient = 'npm' | 'cnpm' | 'tnpm' | 'yarn' | 'pnpm';

enum ENpmClient {
  npm = 'npm',
  cnpm = 'cnpm',
  tnpm = 'tnpm',
  yarn = 'yarn',
  pnpm = 'pnpm',
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
  appTemplate: ETemplate.vitesseLite,
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
  let appTemplate = defaultData?.appTemplate || ETemplate.vitesseLite;

  const { username, email } = await getGitInfo();

  const author = email && username ? `${username} <${email}>` : '';

  let pluginName = `dnk-plugin-${name || 'demo'}`;

  const target = name ? join(cwd, name + '') : cwd;
  const { isCancel, text, select, intro, outro } = clackPrompts;

  const exitPrompt = () => {
    outro(chalk.red('Exit create-umi'));
    process.exit(1);
  };
  const selectAppTemplate = async () => {
    appTemplate = (await select({
      message: 'Pick DNK App Template',
      options: internalTemplate,
      initialValue: ETemplate.vitesseLite,
    })) as ETemplate;
  };
  const selectNpmClient = async () => {
    npmClient = (await select({
      message: 'Pick Npm Client',
      options: [
        { label: ENpmClient.npm, value: ENpmClient.npm },
        { label: ENpmClient.cnpm, value: ENpmClient.cnpm },
        { label: ENpmClient.tnpm, value: ENpmClient.tnpm },
        { label: ENpmClient.yarn, value: ENpmClient.yarn },
        { label: ENpmClient.pnpm, value: ENpmClient.pnpm, hint: 'recommended' },
      ],
      initialValue: ENpmClient.pnpm as ENpmClient,
    })) as ENpmClient;
  };
  const selectRegistry = async () => {
    registry = (await select({
      message: 'Pick Npm Registry',
      options: [
        {
          label: 'npm',
          value: ERegistry.npm,
        },
        {
          label: 'taobao',
          value: ERegistry.taobao,
          hint: 'recommended for China',
        },
      ],
      initialValue: ERegistry.npm as ERegistry,
    })) as ERegistry;
  };
  const internalTemplatePrompts = async () => {
    intro(chalk.bgHex('#19BDD2')(' create-dnk-cms '));

    await selectAppTemplate();
    if (isCancel(appTemplate)) {
      exitPrompt();
    }

    await selectNpmClient();
    if (isCancel(npmClient)) {
      exitPrompt();
    }

    await selectRegistry();
    if (isCancel(registry)) {
      exitPrompt();
    }

    outro(chalk.green(`You're all set!`));
  };

  // --default
  const useDefaultData = !!args.default;

  // --template
  const useExternalTemplate = !!args.template;

  switch (true) {
    case useExternalTemplate:
      await selectNpmClient();
      if (isCancel(npmClient)) {
        exitPrompt();
      }
      await selectRegistry();
      if (isCancel(registry)) {
        exitPrompt();
      }
      // await unpackTemplate({
      //   template: args.template!,
      //   dest: target,
      //   registry,
      // });
      break;
    // TODO: init template from git
    // case: useGitTemplate
    default:
      if (!useDefaultData) {
        await internalTemplatePrompts();
      }
  }

  const version = pkg.version;
  // const monorepoRoot = await detectMonorepoRoot({ target });
  const monorepoRoot = false;

  const inMonorepo = !!monorepoRoot;

  const projectRoot = inMonorepo ? monorepoRoot : target;

  // git
  const shouldInitGit = args.git !== false;

  // now husky is not supported in monorepo
  const withHusky = shouldInitGit && !inMonorepo;

  // pnpm
  let pnpmExtraNpmrc: string = '';

  const isPnpm = npmClient === ENpmClient.pnpm;

  let pnpmMajorVersion: number | undefined;
  let pnpmVersion: string | undefined;

  if (isPnpm) {
    pnpmVersion = await getPnpmVersion();
    pnpmMajorVersion = parseInt(pnpmVersion.split('.')[0], 10);
    console.debug(`pnpm version: ${pnpmVersion}`);
    if (pnpmMajorVersion === 7) {
      // suppress pnpm v7 warning ( 7.0.0 < pnpm < 7.13.5 )
      // https://pnpm.io/npmrc#strict-peer-dependencies
      pnpmExtraNpmrc = `strict-peer-dependencies=false`;
    }

    const injectInternalTemplateFiles = async () => {
      const __filename = fileURLToPath(import.meta.url);
      const generator = new BaseGenerator({
        path: join(dirname(__filename), '..', 'templates', appTemplate),
        target,
        slient: true,
        data: useDefaultData
          ? defaultData
          : ({
              version: version.includes('-canary.') ? version : `^${version}`,
              npmClient,
              registry,
              author,
              email,
              withHusky,
              extraNpmrc: isPnpm ? pnpmExtraNpmrc : '',
            } satisfies ITemplateParams),
      });
      await generator.run();
    };

    if (!useExternalTemplate) {
      await injectInternalTemplateFiles();
    }

    const context: IContext = {
      inMonorepo,
      target,
      projectRoot,
    };

    if (!withHusky) {
      await removeHusky(context);
    }

    if (inMonorepo) {
      // monorepo should move .npmrc to root
      await moveNpmrc(context);
    }
    // init git
    if (shouldInitGit) {
      await initGit(context);
    } else {
      console.info(`Skip Git init`);
    }

    // install deps
    const isPnpm8 = pnpmMajorVersion === 8;
    // https://github.com/pnpm/pnpm/releases/tag/v8.7.0
    // https://pnpm.io/npmrc#resolution-mode
    const pnpmHighestResolutionMinVersion = '8.7.0';
    const isPnpmHighestResolution =
      isPnpm8 && semver.gte(pnpmVersion!, pnpmHighestResolutionMinVersion);
    if (!useDefaultData && args.install !== false) {
      if (isPnpm8 && !isPnpmHighestResolution) {
        await installAndUpdateWithPnpm(target);
      } else {
        installWithNpmClient({ npmClient, cwd: target });
      }
    } else {
      console.info(`Skip install deps`);
      if (isPnpm8) {
        console.warn(
          chalk.yellow(
            `You current using pnpm v8, it will install minimal version of dependencies`
          )
        );
        console.warn(
          chalk.green(
            `Recommended that you run ${chalk.bold.cyan(
              'pnpm up -L'
            )} to install latest version of dependencies`
          )
        );
      }
    }
  }
};
async function getPnpmVersion() {
  try {
    const { stdout } = await execa('pnpm', ['--version']);
    return stdout.trim();
  } catch (e) {
    throw new Error('Please install pnpm first');
  }
}
async function removeHusky(opts: IContext) {
  const dir = join(opts.target, './.husky');
  if (existsSync(dir)) {
    await fsExtra.remove(dir);
  }
}
async function moveNpmrc(opts: IContext) {
  const { target, projectRoot } = opts;
  const sourceNpmrc = join(target, './.npmrc');
  const targetNpmrc = join(projectRoot, './.npmrc');
  if (!existsSync(targetNpmrc)) {
    await fsExtra.copyFile(sourceNpmrc, targetNpmrc);
  }
  await fsExtra.remove(sourceNpmrc);
}
async function initGit(opts: IContext) {
  const { projectRoot } = opts;
  const isGit = existsSync(join(projectRoot, '.git'));
  if (isGit) return;
  try {
    await execa('git', ['init'], { cwd: projectRoot });
  } catch {
    console.error(`Initial the git repo failed`);
  }
}
// pnpm v8 will install minimal version of the dependencies
// so we upgrade all deps to the latest version
async function installAndUpdateWithPnpm(cwd: string) {
  await execa('pnpm', ['up', '-L'], { cwd, stdio: 'inherit' });
}
export const installWithNpmClient = async ({
  npmClient,
  cwd,
}: {
  npmClient: NpmClient;
  cwd?: string;
}) => {
  const { sync } = await cs;
  // pnpm install will not install devDependencies when NODE_ENV === 'production'
  // we should remove NODE_ENV to make sure devDependencies can be installed
  const { NODE_ENV: _, ...env } = process.env;
  const npm = sync(npmClient, [npmClient === 'yarn' ? '' : 'install'], {
    stdio: 'inherit',
    cwd,
    env,
  });
  if (npm.error) {
    throw npm.error;
  }
};
