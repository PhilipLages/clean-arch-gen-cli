import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import { toPascalCase } from '../utils/format';

export const generateCommand = new Command('generate')
  .argument('<type>', 'artifact type: use-case')
  .argument('<target>', 'target, ex: actions/material-stock or entities/user')
  .description('Generate an artifact in its respective layer')
  .action(async (type, target) => {
    const [domainType, rawName] = target.split('/');
    const pascalName = toPascalCase(rawName);

    if (!['actions', 'entities'].includes(domainType)) {
      console.log('❌ Invalid domain. Use: actions or entities.');
      return;
    }

    switch (type) {
      case 'use-case':
        await generateUseCase(domainType, rawName, pascalName);
        break;
      default:
        console.log(`❌ Type not supported: ${type}`);
    }
  });

  async function generateUseCase(domainType: string, name: string, pascalName: string) {
    const basePath = path.resolve('src');
  
    const targetPaths = [
      {
        file: `${basePath}/domain/use-cases/${domainType}/${name}/${name}.ts`,
        template: path.resolve('src/templates/use-case.ejs'),
      },
      {
        file: `${basePath}/data/use-cases/${domainType}/${name}/${name}.ts`,
        template: path.resolve('src/templates/data-selection.ejs'),
      },
      {
        file: `${basePath}/presentation/controllers/${domainType}/${name}/${name}.ts`,
        template: path.resolve('src/templates/controller.ejs'),
      },
    ];
  
    for (const { file, template } of targetPaths) {
      const dir = path.dirname(file);
      await fs.ensureDir(dir);
  
      if (fs.existsSync(file)) {
        console.log(`⚠️  Already exists: ${file} — skipping`);
        continue;
      }
  
      const content = await ejs.renderFile(template, { name, pascalName });
      await fs.writeFile(file, content);
  
      console.log(`✔️  Created: ${file}`);
    }
  
    console.log('\n✅ Use case generated successfully!');
  }
  
  
