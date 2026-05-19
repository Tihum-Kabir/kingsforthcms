import * as migration_20260408_222627_initial from './20260408_222627_initial';
import * as migration_20260519_schema_sync from './20260519_schema_sync';
import * as migration_20260520_patch_missing from './20260520_patch_missing';
import * as migration_20260521_patch_resources from './20260521_patch_resources';
import * as migration_20260522_reset_team from './20260522_reset_team';

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
  {
    up: migration_20260521_patch_resources.up,
    down: migration_20260521_patch_resources.down,
    name: '20260521_patch_resources'
  },
  {
    up: migration_20260522_reset_team.up,
    down: migration_20260522_reset_team.down,
    name: '20260522_reset_team'
  },
];
