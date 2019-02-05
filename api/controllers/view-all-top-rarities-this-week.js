module.exports = {


  friendlyName: 'View all top rarities this week',


  description: 'Display "All top rarities this week" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/all-top-rarities-this-week'
    },
    notFound: {
      description: "This token doesn't exist :(",
      responseType: 'notFound'
    }

  },


  fn: async function () {

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
        date: { '>': previousLastMonday, '<': lastMonday }}).limit(50).sort([{rarity_index: 'asc'}]);

    if (!releases || releases.length==0) { return exits.notFound(); }
    var updatedGridData=[];

    releases.forEach(function(el, i){
        //date_t=new Date(el.date);
        el.rarity_index=Math.round(el.rarity_index)
        //el.date=date_t.toLocaleString('en-us', { month: 'short' })+' '+date_t.getDate();
        updatedGridData[i]= { Pos: i+1, Token: el.token_id,Owner: el.owner,Transaction: el.transaction_hash,Released: el.date,Rarity: el.rarity_index }

    })
    return {gridData: updatedGridData}

  }       


};
