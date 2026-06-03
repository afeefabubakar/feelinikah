import * as migration_20260529_065832_init from './20260529_065832_init';
import * as migration_20260601_112219_add_wishlist_description from './20260601_112219_add_wishlist_description';
import * as migration_20260601_151840_alter_media_alt_optional from './20260601_151840_alter_media_alt_optional';
import * as migration_20260603_090600_update_wishlist from './20260603_090600_update_wishlist';

export const migrations = [
  {
    up: migration_20260529_065832_init.up,
    down: migration_20260529_065832_init.down,
    name: '20260529_065832_init',
  },
  {
    up: migration_20260601_112219_add_wishlist_description.up,
    down: migration_20260601_112219_add_wishlist_description.down,
    name: '20260601_112219_add_wishlist_description',
  },
  {
    up: migration_20260601_151840_alter_media_alt_optional.up,
    down: migration_20260601_151840_alter_media_alt_optional.down,
    name: '20260601_151840_alter_media_alt_optional'
  },
  {
    up: migration_20260603_090600_update_wishlist.up,
    down: migration_20260603_090600_update_wishlist.down,
    name: '20260603_090600_update_wishlist'
  },
];
