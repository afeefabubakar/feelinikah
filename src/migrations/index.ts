import * as migration_20260529_065832_init from './20260529_065832_init';

export const migrations = [
  {
    up: migration_20260529_065832_init.up,
    down: migration_20260529_065832_init.down,
    name: '20260529_065832_init'
  },
];
