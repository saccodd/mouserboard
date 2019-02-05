/**
 * Releases
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      token_id:{
        type: 'number'
      },
      date:{
        type: 'string'
      },
      owner:{
        type: 'string'
      },
      rarity_index:{
        type: 'number'
      },
      sire_id:{
        type: 'number'
      },
      matron_id:{
        type: 'number'
      },
      transaction_hash:{
        type: 'string'
      }
    },
    
    datastore: 'mongodb'
  };
  
  