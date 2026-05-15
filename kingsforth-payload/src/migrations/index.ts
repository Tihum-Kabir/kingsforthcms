import * as migration_20260408_222627_initial from './20260408_222627_initial';

export const migrations = [
  {
    up: migration_20260408_222627_initial.up,
    down: migration_20260408_222627_initial.down,
    name: '20260408_222627_initial'
  },
];
