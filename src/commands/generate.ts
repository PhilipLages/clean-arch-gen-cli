import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import { toPascalCase } from '../utils/format';

export const generateCommand = new Command('generate')
  .argument('<type>', 'artifact type: use-case')
  .argument('<name>', 'artifact name, ex: material-stock')
  .description('Generate an artifact in its respective layer')
  .action(async (type, name) => {
    const pascalName = toPascalCase(name);

    switch (type) {
      case 'use-case':
        await generateUseCase(name, pascalName);
        break;
      default:
        console.log(`❌ Type not supported: ${type}`);
    }
  });

async function generateUseCase(name: string, pascalName: string) {
  const basePath = path.resolve('src');

  const targetPaths = [
    {
      file: `${basePath}/domain/use-cases/actions/${name}/${pascalName}UseCase.ts`,
      template: path.resolve('src/templates/use-case.ejs'),
    },
    {
      file: `${basePath}/data/use-cases/actions/${name}/${name}-selection.ts`,
      template: path.resolve('src/templates/data-selection.ejs'),
    },
    {
      file: `${basePath}/presentation/controllers/actions/${name}/${pascalName}Controller.ts`,
      template: path.resolve('src/templates/controller.ejs'),
    },
  ];

  for (const { file, template } of targetPaths) {
    const dir = path.dirname(file);
    await fs.ensureDir(dir);

    const content = await ejs.renderFile(template, { name, pascalName });
    await fs.writeFile(file, content);

    console.log(`✔️  Created: ${file}`);
  }

  console.log('\n✅ Use case generated successfully!');
}
