import * as migration_20261030_062940_initial from './20261030_062940_initial';
import * as migration_20261030_064036_real_estate_industry from './20261030_064036_real_estate_industry';

export const migrations = [
  {
    up: migration_20261030_062940_initial.up,
    down: migration_20261030_062940_initial.down,
    name: '20261030_062940_initial',
  },
  {
    up: migration_20261030_064036_real_estate_industry.up,
    down: migration_20261030_064036_real_estate_industry.down,
    name: '20261030_064036_real_estate_industry'
  },
];
