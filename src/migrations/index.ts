import * as migration_20260529_065832_init from './20260529_065832_init';
import * as migration_20260601_112219_add_wishlist_description from './20260601_112219_add_wishlist_description';

export const migrations = [
  {
    up: migration_20260529_065832_init.up,
    down: migration_20260529_065832_init.down,
    name: '20260529_065832_init',
  },
  {
    up: migration_20260601_112219_add_wishlist_description.up,
    down: migration_20260601_112219_add_wishlist_description.down,
    name: '20260601_112219_add_wishlist_description'
  },
];
