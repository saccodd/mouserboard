
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
        var lastWeekDates = await sails.helpers.getLastWeek();

        releases= await Releases.find({ 
            date: { '>': lastWeekDates.previousLastMonday, '<': lastWeekDates.lastMonday }}).limit(3).sort([{rarity_index: 'asc'}]);

        if (!releases || releases.length==0) { return exits.notFound(); }
        releases.forEach(function(el, i){
            el.rarity_index=Math.round(el.rarity_index)
            releases[i]=el;
        })
        return exits.success(releases); 
    }
  
  
  };
  

  