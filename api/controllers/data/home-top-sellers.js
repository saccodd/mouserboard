
module.exports = {


    friendlyName: 'This week top sellers',
  
  
    description: 'Return this week top sellers',
    
    inputs:{},
    exits: {
        success: {

        },
        notFound: {
            description: 'KPIs not found in the database.',
            responseType: 'notFound'
        }
    },

    fn: async function (inputs,exits) {
        var lastWeekDates = await sails.helpers.getLastWeek();

        var conditions={
            from: lastWeekDates.previousLastMonday,
            to: lastWeekDates.lastMonday
        }
        sales= await Sales.getWeekTotalSalesByAddress(conditions)

        if (!sales || sales.length==0) { return exits.notFound(); }
        sales.forEach(function(el, i){
            el.from_address=el._id
            el.total_sales=Math.round(el.total_sales*100)/100
            sales[i]=el;
        })
        return exits.success(sales); 
    }
  
  
  };
  

  