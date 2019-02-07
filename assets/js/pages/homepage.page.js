
parasails.registerPage('homepage', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    heroHeightSet: false,
    fields: [
      {
        key: 'last_name',
        sortable: true
      },
      {
        key: 'first_name',
        sortable: false
      },
      {
        key: 'age',
        label: 'Person age',
        sortable: true,
        // Variant applies to the whole column, including the header and footer
        variant: 'danger'
      }
    ],
    items: [
      { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
    ],
    
    keyter:0,
    index:0,
    entry:0,
    searchQuery: '',
    homeTopReleases: false,
    title:'Rare collectibles of the week',
    moreResultsLink:'all-top-rarities-this-week',
    gridColumns: ['Pos','Token', 'Released', 'Rarity'],
    gridData: [
      { Pos: '1', Token:'',Released: '',Rarity:'' },
      { Pos: '2', Token:'',Released: '',Rarity:'' },
      { Pos: '3', Token:'',Released: '',Rarity:'' },

    ],
    
    keyterSales:0,
    indexSales:0,
    entrySales:0,
    searchQuerySales: '',
    homeTopSales: false,
    titleSales:'Top sellers of the week',
    moreResultsLinkSales:'all-top-sellers-this-week',
    gridColumnsSales: ['Pos','Seller', 'Sales'],
    gridDataSales: [
      { Pos: '1', Seller:'',Sales:'' },
      { Pos: '2', Seller:'',Sales:'' },
      { Pos: '3', Seller:'',Sales:'' },

    ],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function(){
    this._setHeroHeight();
    
    this._updateTopReleases()
    this._updateTopSales()
    
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickHeroButton: async function() {
      // Scroll to the 'get started' section:
      $('html, body').animate({
        scrollTop: this.$find('[role="scroll-destination"]').offset().top
      }, 500);
    },

    // Private methods not tied to a particular DOM event are prefixed with _
    _setHeroHeight: function() {
      var $hero = this.$find('[full-page-hero]');
      var headerHeight = $('#page-header').outerHeight();
      var heightToSet = $(window).height();
      heightToSet = Math.max(heightToSet, 500);//« ensure min height of 500px - header height
      heightToSet = Math.min(heightToSet, 1000);//« ensure max height of 1000px - header height
      $hero.css('min-height', heightToSet - headerHeight+'px');
      this.heroHeightSet = true;
    },

    _updateTopReleases: function(){
      var updatedGridData=[];
      var self=this;
      $.getJSON( "/api/v1/home-top-releases", function( data ) {
        data.forEach(function(el,i){
          updatedGridData[i]= { Pos: i+1, Token: el.token_id,Released: el.date,Rarity: el.rarity_index }
        })
        self.gridData=updatedGridData
        self.homeTopReleases=true
      }).fail(function() {
        console.log( "Error loading top releases" );
      });
    },

    _updateTopSales: function(){
      var updatedGridData=[];
      var self=this;
      $.getJSON( "/api/v1/home-top-sellers", function( data ) {
        data.forEach(function(el,i){
          updatedGridData[i]= { Pos: i+1, Seller: el.from_address,Sales: el.total_sales }
        })
        self.gridDataSales=updatedGridData
        self.homeTopSales=true
      }).fail(function() {
        console.log( "Error loading top sellers" );
      });
    }

  }
});
