
module.exports = {


    friendlyName: 'This week top releases',
  
  
    description: 'Return this week top results',
    
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
        releases= await Releases.find({ 
            date: { '>': previousLastMonday, '<': lastMonday }}).limit(3).sort([{rarity_index: 'asc'}]);

        if (!releases || releases.length==0) { return exits.notFound(); }
        releases.forEach(function(el, i){
            //date_t=new Date(el.date);
            el.rarity_index=Math.round(el.rarity_index)
            //el.date=date_t.toLocaleString('en-us', { month: 'short' })+' '+date_t.getDate();
            releases[i]=el;
        })
        return exits.success(releases); 
    }
  
  
  };
  

  