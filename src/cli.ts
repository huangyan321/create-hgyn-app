/** @format */

import yParser from 'yargs-parser';
import chalk from 'chalk';
import pkg from '../package.json';
import run from '.';
const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version'],
});

if (args.version && !args._[0]) {
  args._[0] = 'version';
  const local = chalk.cyan('@local');
  const { name, version } = pkg;
  console.log(`${name}@${version}${local}`);
} else {
  run({
    cwd: process.cwd(),
    args,
  }).catch((err: Error) => {
    console.error(`Create failed, ${err.message}`);
    console.error(err);
  });
}
