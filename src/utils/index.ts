/** @format */

import { execa } from 'execa';
export interface IGitInfo {
  username: string;
  email: string;
}

export async function getGitInfo(): Promise<IGitInfo> {
  try {
    const [{ stdout: username }, { stdout: email }] = await Promise.all([
      execa('git config --global user.name'),
      execa('git config --global user.email'),
    ]);
    return { username, email };
  } catch (e) {
    return {
      username: '',
      email: '',
    };
  }
}
