import { access, mkdir, writeFile } from 'fs/promises';
import { exec } from 'child_process';

const stringify = (json: object): string => JSON.stringify(json, null, 2);
const README = (
  projectName: string,
): string => `# [${projectName}](https://apcsp.netlify.app/${projectName})

Run \`pnpm bump\` to push to github

_Created by Aiden Bai on ${new Date().toDateString()} (${Date.now()})_
`;
const package_json = (projectName: string): string =>
  stringify({
    name: projectName,
    version: '0.0.0',
    description: '',
    main: '',
    scripts: {
      bump: `git add . && git commit -m '${projectName} ${Date.now()}' && git push`,
      test: 'echo "Error: no test specified" && exit 1',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/aidenybai/apcsp.git',
    },
    keywords: [projectName, 'apcsp'],
    author: 'Aiden Bai <hello@aidenybai.com>',
    license: 'MIT',
    bugs: {
      url: 'https://github.com/aidenybai/apcsp/issues',
    },
    homepage: `https://github.com/aidenybai/apcsa/tree/main/${projectName}#readme`,
  });

const prettierrc = stringify({
  printWidth: 100,
  quoteProps: 'as-needed',
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
});

(async (): Promise<void> => {
  const projectName = process.argv.slice(2).join(' ').toLowerCase().replace(/\s+/g, '-');
  const projectPath: string = `${__dirname}/${projectName}`;

  try {
    await access(projectPath);
    throw new Error('Path already exists');
  } catch (_err) {
    await mkdir(projectPath);
    await writeFile(`${projectPath}/README.md`, README(projectName));
    await writeFile(`${projectPath}/.prettierrc`, prettierrc);
    await writeFile(`${projectPath}/package.json`, package_json(projectName));
    exec(`code ${projectName}`);
    console.log(`Created project ${projectName} successfully`);
  }
})();
