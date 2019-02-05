
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
        /*
        sales.forEach(function(el, i){
            //date_t=new Date(el.date);
            el.from_address=el._id
            el.total_sales=Math.round(el.total_sales*100)/100
            //el.date=date_t.toLocaleString('en-us', { month: 'short' })+' '+date_t.getDate();
            sales[i]=el;
        })*/
        return exits.success(sales); 
    }
  
  
  };
  

  