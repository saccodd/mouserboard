module.exports = {


  friendlyName: 'Get last week dates',


  description: 'Get last week dates - Currently today date is hardcoded to be Feb 5th, 2019 (check also js-timestamp component for the front-end) ',


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'Last week dates',
    },

  },


  fn: async function (inputs) {

    // Get last week.
    var lastWeekDates={};
    
    var today= new Date('02/05/2019')//.toUTCString()
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setHours(0,0,0,0);
    today.setTime( today.getTime() - 1 * 86400000 )
    
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
    lastWeekDates={lastMonday: lastMonday, previousLastMonday:previousLastMonday}
    // Send back the result through the success exit.
    return lastWeekDates;

  }


};

