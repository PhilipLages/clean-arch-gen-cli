#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from '../commands/init';
// import { generateCommand } from '../src/commands/generate';

const program = new Command();

program.name('clean-arch-gen-cli').description('Clean Architecture Generator CLI').version('1.0.0');

program.addCommand(initCommand);
// program.addCommand(generateCommand);

program.parse();
