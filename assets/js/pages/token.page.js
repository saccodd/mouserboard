parasails.registerPage('token', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tokenid:"",
    updatedFeed: false, 
    feed:[],
    msg:"",
    modalMessage:"",
    syncingTransaction: false,
    syncingAlways: true
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    $('#page-footer').hide();
  },
  mounted: async function() {
    this._updateFeed();
    try{
      web3.version.getNetwork((err, netId) => {
        if (netId!=42){
          this.modalMessage="Wrong network. Please use Kovan"
          $('#warningModal').modal({
              backdrop: 'static',
              keyboard: false
          })
        }
      })
    } catch(error){
      this.modalMessage="Please install a wallet bridge (e.g. Metamask) and reload"
      $('#warningModal').modal({
          backdrop: 'static',
          keyboard: false
      })
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _updateFeed: function(){
      var self=this;
      $.getJSON( "/api/v1/get-token-sales/cryptokitties/"+self.tokenid, function( data ) {
        self.updatedFeed=true;
        var updatedData=[];
        data.forEach(function(el,i){
          updatedData[i]=el;
          updatedData[i].res_total_price= Math.round(el.res_total_price *100)/100;
        })
        self.feed=updatedData;
      }).fail(function() {
        console.log( "Error loading top releases" );
      });
    },
    signTransaction: async function(tok_id){

      this.syncingTransaction=true

      //defining constants
      const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new ZeroEx.BigNumber(2).pow(256).minus(1);
      const DECIMALS = 18;
      const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
      const ZERO = new ZeroEx.BigNumber(0);
      const GANACHE_NETWORK_ID = 50;
      const KOVAN_NETWORK_ID = 42;
      const ROPSTEN_NETWORK_ID = 3;
      const RINKEBY_NETWORK_ID = 4;
      const ONE_SECOND_MS = 1000;
      const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
      const TEN_MINUTES_MS = ONE_MINUTE_MS * 10;
      // get 0x addresses for Kovan
      var contractAddresses = getContractAddressesForNetworkOrThrow(42); 
      // encode Weth token for taker payment
      var wethTokenAddress = contractAddresses.etherToken;
      const takerAssetData = ZeroEx.assetDataUtils.encodeERC20AssetData(wethTokenAddress);
      
      var provider = window.web3.currentProvider.isMetaMask
                              ? new ZeroEx.MetamaskSubprovider(window.web3.currentProvider)
                              : window.web3.currentProvider;
      const web3Wrapper = new Web3Wrapper(provider);
      const availableAddresses = await web3Wrapper.getAvailableAddressesAsync();
      const firstAvailableAddress = _.head(availableAddresses);
      const taker = firstAvailableAddress;
      
      // define maker for minting at runtime and selling on Kovan
      const maker = '0x5409ed021d9299bf6814279a6a1411a7e866a631'

      // some console logging
      console.log(maker)
      console.log(taker)


      // initiate  minting
      const mnemonicWallet = new SubProviders.MnemonicWalletSubprovider({
          mnemonic: 'concert load couple harbor equip island argue ramp clarify fence smart topic',
          baseDerivationPath: "44'/60'/0'/0",
      });
    
      const pe = new ZeroEx.Web3ProviderEngine();
      pe.addProvider(mnemonicWallet);
      pe.addProvider(new ZeroEx.RPCSubprovider('https://kovan.infura.io/'));
      pe.start();
      
      const providerEngine = pe;
      const contractWrappers = new ZeroEx.ContractWrappers(providerEngine, { networkId: 42 });
      var tokenAddress='0x84580f1ea9d989c71c13492d5d157712f08795d8'
      const dummyERC721TokenContract = new AbiGenWrappers.DummyERC721TokenContract(ContractArtifacts.DummyERC721Token.compilerOutput.abi, tokenAddress, providerEngine);
      console.log("ERC721 address: "+dummyERC721TokenContract.address)
      
      // mint random token
      const tokenId = ZeroEx.generatePseudoRandomSalt();
      const mintTxHash = await dummyERC721TokenContract.mint.sendTransactionAsync(maker, tokenId, { from: maker });

      // define data for order
      var makerAssetData=ZeroEx.assetDataUtils.encodeERC721AssetData(dummyERC721TokenContract.address,tokenId)
      const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(1), 0);
      const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(22), 14);
      let txHash = null;

      
      try{
        // Allow the 0x ERC721 Proxy to move ERC721 tokens on behalf of maker
        const makerERC721ApprovalTxHash = await contractWrappers.erc721Token.setProxyApprovalForAllAsync(
            dummyERC721TokenContract.address,
            maker,
            true,
            TransactionOpts = {
                gasLimit: 400000, // limit: 8000000
                nonce: 4000
            }
        );
        
        // create order at runtime
        let order = {
            exchangeAddress: "0x35dd2932454449b14cee11a94d3674a936d5d7b2", // Exchange address for Kovan
            expirationTimeSeconds: this._getRandomFutureDateInSeconds(),
            feeRecipientAddress: "0x0000000000000000000000000000000000000000", // Address of the relayer
            makerAddress: maker,
            makerAssetAmount: makerAssetAmount,
            makerAssetData: makerAssetData,
            makerFee: ZERO,
            salt: ZeroEx.generatePseudoRandomSalt(),
            senderAddress: "0x0000000000000000000000000000000000000000",
            takerAddress: "0x0000000000000000000000000000000000000000",
            takerAssetAmount: takerAssetAmount,
            takerAssetData: takerAssetData,
            takerFee: ZERO
        }
        
        // sign maker order
        const orderHashHex = ZeroEx.orderHashUtils.getOrderHashHex(order);
        const signature = await ZeroEx.signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, maker);
        const signedOrder = { ...order, signature };
        
        // execute transaction
        const contractWrappersTaker = new ZeroEx.ContractWrappers(provider, { networkId: 42 }); // do it on Kovan
        txHash = await contractWrappersTaker.forwarder.marketBuyOrdersWithEthAsync(
            [signedOrder],
            order.makerAssetAmount,
            taker,
            order.takerAssetAmount,
            [],
            0,
            NULL_ADDRESS,
            {
                gasLimit: 400000,
            },
        );
        console.log(txHash)
        
        tx_conf=await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        
        // print successful transaction message
        var msg = {
          date: moment(),
          from_address: "0x88ba6d5a7abe727d73b0f4c7965775b959646f7e",
          id: "5c45f70a22b6cbfc23afd439",
          res_date: moment(),
          res_event: "AuctionSuccessful",
          res_total_price: 0.0022,
          res_winner: taker,
          token_id: tok_id,

        }
        this._addMessage(msg);
        this._changeMarketButton();
      } catch(error){
          console.log(error);
      }
      this.syncingTransaction=false
      providerEngine.stop();
    },
    _getRandomFutureDateInSeconds: function(){
      const ONE_SECOND_MS = 1000;
      const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
      const TEN_MINUTES_MS = ONE_MINUTE_MS * 10;
      return new ZeroEx.BigNumber(Date.now() + TEN_MINUTES_MS).div(ONE_SECOND_MS).ceil();
    },
    _addMessage: function(msg){
      var self=this;
      console.log(self.feed);
      self.feed.unshift(msg);
    },
    _changeMarketButton: function(){
      $('#sell-area').show();
      $('#buy-area').hide();
    },
    sendMsg: async function(comment){
      var self=this;
      var provider = window.web3.currentProvider.isMetaMask
                              ? new ZeroEx.MetamaskSubprovider(window.web3.currentProvider)
                              : window.web3.currentProvider;
      const web3Wrapper = new Web3Wrapper(provider);
      const availableAddresses = await web3Wrapper.getAvailableAddressesAsync();
      const firstAvailableAddress = _.head(availableAddresses);
      const user_address = firstAvailableAddress;
      var newMsg
      if (!comment){
        newMsg={
          text: self.msg,
          date: moment(),
          from_address: user_address,
          res_event: "Message",
        }
      }else{
        newMsg=comment
      }
      if (self.feed.length==0){
        self.feed=[newMsg]
      }else{
        self.feed.unshift(newMsg);
      }

      self.msg=""
      if (!comment) {
        setTimeout(function(){
          $('#message-loader').show();

        },2000)
        setTimeout(function(){
          $('#message-loader').hide();
          var from_address
          self.feed.forEach(function(el,i){
            if (!from_address){
              if (el.res_event=='AuctionSuccessful')
                from_address=el.res_winner
            }
          })
          if (!from_address){
            from_address=self.owner
          }

          var text="I was about to submit it for sale here, check it out"
          var newMsg={
            text: text,
            date: moment(),
            from_address: from_address,
            res_event: "Message",
            to_address: user_address,
          }
          self.sendMsg(newMsg)
        }, 6000);

      } else{
        setTimeout(function(){
          $('#buy-area').show();
        }, 4000);
      }
    }
  }
});
