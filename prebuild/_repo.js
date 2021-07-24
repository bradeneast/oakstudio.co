import octokit from "octokit";
import dotenv from 'dotenv';
dotenv.config();

const { Octokit } = octokit;
const client = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
const owner = "bradeneast";
const repo = "oakstudio.co";

export async function updateFileContents(path, contents) {
  const file = await getFile(path);
  const content = new Buffer.from(contents, 'utf8').toString('base64');
  const data = {
    owner: owner,
    repo: repo,
    path: path,
    content: content,
    message: `[skip ci] Update ${path} from octokit NodeJS client`,
  };

  if (file) data.sha = file.data.sha;

  return client.rest.repos
    .createOrUpdateFileContents(data)
    .catch(console.error)
}

export async function getFile(path) {
  return client.rest.repos
    .getContent({
      accept: "application/vnd.github.v3+json",
      owner,
      repo,
      path,
    })
    .catch(console.error)
}

export async function getFileContents(path) {
  const res = await getFile(path);
  const buff = new Buffer.from(res.data.content, 'base64');
  return buff.toString('utf8');
}