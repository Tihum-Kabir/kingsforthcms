import * as migration_20260408_222627_initial from './20260408_222627_initial';
import * as migration_20260519_schema_sync from './20260519_schema_sync';
import * as migration_20260520_patch_missing from './20260520_patch_missing';

export const migrations = [
  {
    up: migration_20260408_222627_initial.up,
    down: migration_20260408_222627_initial.down,
    name: '20260408_222627_initial'
  },
  {
    up: migration_20260519_schema_sync.up,
    down: migration_20260519_schema_sync.down,
    name: '20260519_schema_sync'
  },
  {
    up: migration_20260520_patch_missing.up,
    down: migration_20260520_patch_missing.down,
    name: '20260520_patch_missing'
  },
];
