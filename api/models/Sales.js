/**
 * Sales
 *
 * @description :: A sale definition.  Represents an auction, that can be open, successful, or cancelled
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'sales_subset',

    attributes: {
      token_id:{
        type: 'number'
      },
      date:{
        type: 'string'
      },
      from_address:{
        type: 'string'
      },
      res_total_price:{
        type: 'number',
        allowNull: true
      },
      res_event:{
        type: 'string',
        allowNull: true
      },
      res_winner:{
        type: 'string',
        allowNull: true
      },
      res_date:{
        type: 'string',
        allowNull: true
      }

    },
    
    getWeekTotalSalesByAddress: async function (conditions) {
      var db = Sales.getDatastore().manager;
      var from=conditions.from;
      var to = conditions.to;
      // Now we can do anything we could do with a Mongo `db` instance:
      var rawSellers = db.collection(Sales.tableName);
      var sellers
      //db.sales.aggregate([{ $match:{res_event: "AuctionSuccessful"}},{$group : {_id : "$from_address", total_sales : {$sum : "$res_total_price"}}}, {$sort:{total_sales: -1}}])
      sellers = await rawSellers.aggregate([{ $match: {$and:[{res_event: "AuctionSuccessful"},  {res_date: { $gt: from.toISOString()}}, {res_date: { $lt: to.toISOString() }}]} },{$group : {_id : "$from_address", total_sales : {$sum : "$res_total_price"}}}, {$sort:{total_sales: -1}}, { $limit : 3 }]).toArray();
      return sellers;

    },

    datastore: 'mongodb'
  };
  
  