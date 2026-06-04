import * as migration_20260529_065832_init from './20260529_065832_init';
import * as migration_20260601_112219_add_wishlist_description from './20260601_112219_add_wishlist_description';
import * as migration_20260601_151840_alter_media_alt_optional from './20260601_151840_alter_media_alt_optional';
import * as migration_20260603_090600_update_wishlist from './20260603_090600_update_wishlist';
import * as migration_20260603_130400_add_wishlist_hide from './20260603_130400_add_wishlist_hide';
import * as migration_20260604_025826_add_side_to_rsvp from './20260604_025826_add_side_to_rsvp';
import * as migration_20260604_143000_add_children_count_to_rsvp from './20260604_143000_add_children_count_to_rsvp';

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
  {
    up: migration_20260603_130400_add_wishlist_hide.up,
    down: migration_20260603_130400_add_wishlist_hide.down,
    name: '20260603_130400_add_wishlist_hide'
  },
  {
    up: migration_20260604_025826_add_side_to_rsvp.up,
    down: migration_20260604_025826_add_side_to_rsvp.down,
    name: '20260604_025826_add_side_to_rsvp'
  },
  {
    up: migration_20260604_143000_add_children_count_to_rsvp.up,
    down: migration_20260604_143000_add_children_count_to_rsvp.down,
    name: '20260604_143000_add_children_count_to_rsvp'
  },
];
