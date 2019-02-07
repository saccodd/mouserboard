
module.exports = {


    friendlyName: 'Get token sales',
  
  
    description: 'Return all sales and auctions for a token',
    
    inputs:{},
    exits: {
        success: {

        },
        notFound: {
            description: 'Data not found in the database.',
            responseType: 'notFound'
        }
    },

    fn: async function (inputs,exits) {
        var contract=this.req.params.contract
        if (!contract || contract!='cryptokitties' || token_id) { throw 'notFound'; }
        var token_id=this.req.params.tokenid

        sales= await Sales.find({ 
            token_id: token_id}).sort([{date: 'desc'}]);
           
        if (!sales || sales.length==0) { throw 'notFound'; }

        return exits.success(sales); 
    }
  
  
  };
  

  