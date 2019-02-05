
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
        var today= new Date('11/13/2018')//.toUTCString()
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setHours(0,0,0,0);
        today.setTime( today.getTime() - 1 * 86400000 )
        console.log(today)
        
        var day = today.getDay();
        
        //var diff = 7 - 1 + day;
        //var diff = (day <= 1) ? (7 - 1 + day ) : (day - 1);
        var diff = (7 - 1 + day) % 7;
        
        var tempDate=new Date(today.getTime())
        var date = new Date(tempDate.setTime( tempDate.getTime() - (diff+1) * 86400000 ));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var lastMonday = date//.getTime();
        lastMonday.setHours(0,0,0,0);
        console.log(lastMonday)
        
        tempDate_2=new Date(lastMonday.getTime())
        var date_2 = new Date(tempDate_2.setTime( tempDate_2.getTime() - 7 * 86400000 ));
        var previousLastMonday=date_2//.getTime();
        previousLastMonday.setHours(0,0,0,0);
        console.log(previousLastMonday)
        var conditions={
            from: previousLastMonday,
            to: lastMonday
        }
        sales= await Sales.getWeekTotalSalesByAddress(conditions)
        /*
        .find({ 
            res_event: "AuctionSuccessful",
            date: { '>': previousLastMonday, '<': lastMonday }}).limit(3).sort([{res_total_price: 'desc'}]);
            */
        if (!sales || sales.length==0) { return exits.notFound(); }
        sales.forEach(function(el, i){
            //date_t=new Date(el.date);
            el.from_address=el._id
            el.total_sales=Math.round(el.total_sales*100)/100
            //el.date=date_t.toLocaleString('en-us', { month: 'short' })+' '+date_t.getDate();
            sales[i]=el;
        })
        return exits.success(sales); 
    }
  
  
  };
  

  