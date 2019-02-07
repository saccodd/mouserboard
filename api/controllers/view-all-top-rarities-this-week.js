module.exports = {


  friendlyName: 'View all top rarities this week',


  description: 'Display "All top rarities this week" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/all-top-rarities-this-week'
    },
    notFound: {
      description: "No results :(",
      responseType: 'notFound'
    }

  },


  fn: async function () {
    var lastWeekDates = await sails.helpers.getLastWeek();

    releases= await Releases.find({ 
        date: { '>': lastWeekDates.previousLastMonday, '<': lastWeekDates.lastMonday }}).limit(50).sort([{rarity_index: 'asc'}]);

    if (!releases || releases.length==0) { return exits.notFound(); }
    var updatedGridData=[];

    releases.forEach(function(el, i){
        el.rarity_index=Math.round(el.rarity_index)
        updatedGridData[i]= { Pos: i+1, Token: el.token_id,Owner: el.owner,Transaction: el.transaction_hash,Released: el.date,Rarity: el.rarity_index }

    })
    return {gridData: updatedGridData}

  }       


};
