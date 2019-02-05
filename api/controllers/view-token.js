module.exports = {


  friendlyName: 'View token',


  description: 'Display "Token" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/token'
    },

    notFound: {
        description: "This token doesn't exist :(",
        responseType: 'notFound'
    }
  },


  fn: async function () {
    var contract=this.req.params.contract
    if (!contract || contract!='cryptokitties' || token_id) { throw 'notFound'; }
    var token_id=this.req.params.tokenid
    releases= await Releases.find({ 
      token_id: token_id});

    if (!releases || releases.length==0) { throw 'notFound'; }
    
    /*releases.forEach(function(el, i){
        //date_t=new Date(el.date);
        el.rarity_index=Math.round(el.rarity_index)
        //el.date=date_t.toLocaleString('en-us', { month: 'short' })+' '+date_t.getDate();
        releases[i]=el;
    })
    */
    // Respond with view.
    return { tokenid:this.req.params.tokenid,
              date: releases[0].date,
              sireid: releases[0].sire_id,
              matronid: releases[0].matron_id,
              owner: releases[0].owner,
              rarity_index: Math.round(releases[0].rarity_index)
            }

  }


};
