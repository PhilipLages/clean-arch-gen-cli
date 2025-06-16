import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';

export const initCommand = new Command('init')
  .description('Initialize the base structure of the Clean Architecture project')
  .action(() => {
    const basePath = path.resolve('src');

    const folders = [
      'data/use-cases/',
      'domain/errors',
      'domain/external-apis',
      'domain/models/',
      'domain/models/db',
      'domain/models/s4',
      'domain/repositories',
      'domain/use-cases/',
      'infra/external-apis/s4',
      'infra/external-apis/i18n',
      'infra/repositories',
      'main/config',
      'main/external',
      'main/factories/',
      'main/controllers/',
      'main/routes',
      'presentation/controllers/',
      'scripts',
      'base',
      'test',
    ];

    console.log('📁 Creating base structure...');

    folders.forEach(folder => {
      const fullPath = path.join(basePath, folder);
      fs.ensureDirSync(fullPath);
      console.log(`  ✔️  ${fullPath}`);
    });

    console.log('\n✅ Structure created successfully!');
  });
