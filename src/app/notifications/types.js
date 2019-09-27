export const notificationTypes = {
  ERROR: 'ERROR',
  TX: 'TX',
  MIGRATE_RESOLVER: 'MIGRATE_RESOLVER',
};

export const txTypes = {
  START_AUCTION: 'START_AUCTION',
  BID_AUCTION: 'BID_AUCTION',
  UNSEAL_AUCTION: 'UNSEAL_AUCTION',
  FINALIZE_AUCTION: 'FINALIZE_AUCTION',

  SET_OWNER: 'SET_OWNER',
  SET_RESOLVER: 'SET_RESOLVER',
  SET_REVERSE_RESOLUTION: 'SET_REVERSE_RESOLUTION',
  SET_TTL: 'SET_TTL',
  SET_SUBNODE_OWNER: 'SET_SUBNODE_OWNER',

  SET_ADDR: 'SET_ADDR',
  SET_CONTENT: 'SET_CONTENT',

  SET_CHAIN_ADDR: 'SET_CHAIN_ADDR',
};

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const VIEW_NOTIFICATION = 'VIEW_NOTIFICATION';
export const TX_MINED = 'TX_MINED';

export const MIGRATE_RESOLVER_NOTIFICATION = 'MIGRATE_RESOLVER_NOTIFICATION';
