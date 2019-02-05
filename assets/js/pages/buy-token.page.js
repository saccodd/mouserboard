

parasails.registerPage('buy-token', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    
  },
  mounted: async function() {
    this._init0xInstant();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _init0xInstant: async function(){
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
/*
      var assetData=ZeroEx.assetDataUtils.encodeERC721AssetData('0x06012c8cf97bead5deae237070f9587f8e7a266d', 18)
      var assetData20=ZeroEx.assetDataUtils.encodeERC20AssetData('0x06012c8cf97bead5deae237070f9587f8e7a266d')

      console.log(assetData)
      console.log(assetData20)
      
      console.log(AssetBuyer)
      
      zeroExInstant.render({
        orderSource: 'https://api.openrelay.xyz/v2/',
        availableAssetDatas: ['0x0257179200000000000000000000000084580f1ea9d989c71c13492d5d157712f08795d80000000000000000000000000000000000000000000000000000000000000001'],
        networkId: 42, // Kovan

        additionalAssetMetaDataMap: {
            '0x0257179200000000000000000000000084580f1ea9d989c71c13492d5d157712f08795d80000000000000000000000000000000000000000000000000000000000000001': {
                assetProxyId: '0x02571792', // ERC721 Proxy Id 
                decimals: 18,
                symbol: 'CK',
                name: 'My Custom Token',
                primaryColor: '#F2F7FF', // Optional 
                //iconUrl: 'https://cdn.icons.com/my_icon.svg', // Optional
                imageUrl: 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/18.svg'

            }
          }
        }, 'body');
        */

        /*
        const provider = window.ethereum;
        const sraUrl = 'https://api.radarrelay.com/0x/v2'; //       'https://api.openrelay.xyz/v2/';
        const zrxAssetData = '0xf47261b0000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498';
        console.log('diocan')

        const assetBuyer = AssetBuyer.getAssetBuyerForStandardRelayerAPIUrl(provider, sraUrl);
        console.log('diocan')

        console.log(assetBuyer)
        const amountToBuy = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(10000000));
        const quote = await assetBuyer.getBuyQuoteAsync(zrxAssetData, amountToBuy);
        console.log(quote)
        const txHash = await assetBuyer.executeBuyQuoteAsync(quote);
        console.log(txHash)
        */
        
        /* 
        
        
        FUNGEEEEE


        const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(1), 0);
        const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(2000), 14);
        console.log(takerAssetAmount)
        let txHash = null;
        // We make a new object here just so we prune any extra data that we may have attached to the order
        let order = {
            exchangeAddress: "0x4f833a24e1f95d70f028921e27040ca56e09ab0b",
            expirationTimeSeconds: this._getRandomFutureDateInSeconds(),
            feeRecipientAddress: "0x013ec57d1237e7727f818b1a35e3506f754304e4",
            makerAddress: "0x5c31c6af15b9a4e0c26ec4ad4a0417708d6b6f93",
            makerAssetAmount: makerAssetAmount,
            makerAssetData: "0x02571792000000000000000000000000a5e5be69c923c701ae6ac8f1f5936af3ae610c68000000000000000000000000000000000000000000000000000000000000073e",
            makerFee: ZERO,
            salt: ZeroEx.generatePseudoRandomSalt(),
            senderAddress: "0x0000000000000000000000000000000000000000",
            signature: "0x1ca1accbb325d7097bcee6334666d739c7cc25a397af2345270c8f4a9ae2ff30000efb3ab237b63cb8e83769181f18360d15caceffadd19140280ee971b08cf4e702",
            takerAddress: "0x0000000000000000000000000000000000000000",
            takerAssetAmount: takerAssetAmount,
            takerAssetData: "0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            
            takerFee: ZERO
        }
        var provider = window.web3.currentProvider.isMetaMask
                                ? new ZeroEx.MetamaskSubprovider(window.web3.currentProvider)
                                : window.web3.currentProvider;
        let orders = [];
        orders.push(order);
        //try{
            let buyer = AssetBuyer.getAssetBuyerForProvidedOrders(provider,orders);

            const buyQuote = await buyer.getBuyQuoteAsync(order.makerAssetData, new ZeroEx.BigNumber(1), {
                slippagePercentage: 0,
                feePercentage: 0.03
            });
            console.log(buyQuote)

            const web3Wrapper = new Web3Wrapper(provider);
            const availableAddresses = await web3Wrapper.getAvailableAddressesAsync();
            const firstAvailableAddress = _.head(availableAddresses);
            var taker = firstAvailableAddress;
            

            const contractWrappers = new ZeroEx.ContractWrappers(provider, { networkId: 1 });
            txHash = await contractWrappers.forwarder.marketBuyOrdersWithEthAsync(
              [order],
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
          */
        /*
        
        // EXAMPLE ON CRYPTOKITTIeS, seems to work, gets reverted for some reason - try to sign the order
        
        // address of the original contract
        //var assetData=ZeroEx.assetDataUtils.encodeERC721AssetData('0xe7e45701520ce91f34b1df31a8ca6436ef969531', new ZeroEx.BigNumber(138))
        // address of the maker
        var makerAssetData=ZeroEx.assetDataUtils.encodeERC721AssetData('0x22d1a32a0be51f71702f8f64c56e51c7560b2f4c', new ZeroEx.BigNumber(1367000))
 
        var contractAddresses = getContractAddressesForNetworkOrThrow(1); //Addresses for Kovan
        var wethTokenAddress = contractAddresses.etherToken;

        const takerAssetData = ZeroEx.assetDataUtils.encodeERC20AssetData(wethTokenAddress);
        console.log(takerAssetData)

        const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(1), 0);
        const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(14), 14);
        let txHash = null;
        // We make a new object here just so we prune any extra data that we may have attached to the order
        let order = {
            exchangeAddress: "0x4f833a24e1f95d70f028921e27040ca56e09ab0b", // Exchange address for Mainnet
            expirationTimeSeconds: this._getRandomFutureDateInSeconds(),
            feeRecipientAddress: "0xf55320c2eb299d03e2792fca5e1cdf5b7c85fb54", // Address of the relayer
            makerAddress: "0x22d1a32a0be51f71702f8f64c56e51c7560b2f4c", // address of the token owner
            makerAssetAmount: makerAssetAmount,
            makerAssetData: makerAssetData,
            makerFee: ZERO,
            salt: ZeroEx.generatePseudoRandomSalt(),
            senderAddress: "0x0000000000000000000000000000000000000000",
            signature: "0x1ca1accbb325d7097bcee6334666d739c7cc25a397af2345270c8f4a9ae2ff30000efb3ab237b63cb8e83769181f18360d15caceffadd19140280ee971b08cf4e702",
            takerAddress: "0x0000000000000000000000000000000000000000",
            takerAssetAmount: takerAssetAmount,
            takerAssetData: takerAssetData,
            takerFee: ZERO
        }
        var provider = window.web3.currentProvider.isMetaMask
                                ? new ZeroEx.MetamaskSubprovider(window.web3.currentProvider)
                                : window.web3.currentProvider;
        let orders = [];
        orders.push(order);
        //try{
            let buyer = AssetBuyer.getAssetBuyerForProvidedOrders(provider,orders);

            const buyQuote = await buyer.getBuyQuoteAsync(order.makerAssetData, new ZeroEx.BigNumber(1), {
                slippagePercentage: 0,
                feePercentage: 0
            });
            console.log(buyQuote)

            const web3Wrapper = new Web3Wrapper(provider);
            const availableAddresses = await web3Wrapper.getAvailableAddressesAsync();
            const firstAvailableAddress = _.head(availableAddresses);
            var taker = firstAvailableAddress;
            

            const contractWrappers = new ZeroEx.ContractWrappers(provider, { networkId: 1 }); // do it on Kovan
            
            txHash = await contractWrappers.forwarder.marketBuyOrdersWithEthAsync(
              [order],
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
        */
        
              
        /*
        // Second test on Cryptokitties
       var contractAddresses = getContractAddressesForNetworkOrThrow(1); 
       var wethTokenAddress = contractAddresses.etherToken;
       const takerAssetData = ZeroEx.assetDataUtils.encodeERC20AssetData(wethTokenAddress);



       const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(1), 0);
       const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(18), 14);
       
       var provider = window.web3.currentProvider.isMetaMask
                               ? new ZeroEx.MetamaskSubprovider(window.web3.currentProvider)
                               : window.web3.currentProvider;
       const web3Wrapper = new Web3Wrapper(provider);
       const availableAddresses = await web3Wrapper.getAvailableAddressesAsync();
       const firstAvailableAddress = _.head(availableAddresses);
       const taker = firstAvailableAddress;
       const maker = '0xfc624f8f58db41bdb95aedee1de3c1cf047105f1'
       var tokenAddress='0x06012c8cf97bead5deae237070f9587f8e7a266d'
       //let approved = await ZeroEx.assetDataUtils.isERC721Approved(tokenAddress);
       //console.log(approved)
       var makerAssetData=ZeroEx.assetDataUtils.encodeERC721AssetData(tokenAddress, new ZeroEx.BigNumber(1040462))
        

        // We make a new object here just so we prune any extra data that we may have attached to the order
        let order = {
            exchangeAddress: "0x4f833a24e1f95d70f028921e27040ca56e09ab0b", // Exchange address for mainnet
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
        

        
        console.log('daiiii 2')

        const orderHashHex = ZeroEx.orderHashUtils.getOrderHashHex(order);
        console.log(orderHashHex)
        const signature = await ZeroEx.signatureUtils.ecSignHashAsync(provider, orderHashHex, maker);
        console.log(signature)

        const signedOrder = { ...order, signature };


        const contractWrappersTaker = new ZeroEx.ContractWrappers(provider, { networkId: 1 }); 
                
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
        
        providerEngine.stop();


        */

         //TEST ON KOVAN, minting token

        // address of the original contract
        //var assetData=ZeroEx.assetDataUtils.encodeERC721AssetData('0xe7e45701520ce91f34b1df31a8ca6436ef969531', new ZeroEx.BigNumber(138))
        // address of the maker
        
        var contractAddresses = getContractAddressesForNetworkOrThrow(42); //Addresses for Kovan
        var wethTokenAddress = contractAddresses.etherToken;

        const takerAssetData = ZeroEx.assetDataUtils.encodeERC20AssetData(wethTokenAddress);
        var provider = window.web3.currentProvider.isMetaMask
                                ? new ZeroEx.MetamaskSubprovider(window.web3.currentProvider)
                                : window.web3.currentProvider;
        const web3Wrapper = new Web3Wrapper(provider);
        const availableAddresses = await web3Wrapper.getAvailableAddressesAsync();
        const firstAvailableAddress = _.head(availableAddresses);
        const taker = firstAvailableAddress;
        const maker = '0x5409ed021d9299bf6814279a6a1411a7e866a631' // kovan
 
        console.log(maker)
        console.log(taker)

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
        
        const tokenId = ZeroEx.generatePseudoRandomSalt();
        var makerAssetData=ZeroEx.assetDataUtils.encodeERC721AssetData(dummyERC721TokenContract.address,tokenId)

        const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(1), 0);
        const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new ZeroEx.BigNumber(200), 14);
        let txHash = null;

        const mintTxHash = await dummyERC721TokenContract.mint.sendTransactionAsync(maker, tokenId, { from: maker });

        console.log(contractWrappers.erc721Token)
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

        // We make a new object here just so we prune any extra data that we may have attached to the order
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
        

        const orderHashHex = ZeroEx.orderHashUtils.getOrderHashHex(order);

        const signature = await ZeroEx.signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, maker);

        const signedOrder = { ...order, signature };

       

        
        const contractWrappersTaker = new ZeroEx.ContractWrappers(provider, { networkId: 42 }); // do it on Kovan
        try{  
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
        }
        catch(error)
        {
            console.log(error);
        }
        providerEngine.stop();

        /*
        let orders = [];
        orders.push(order);
        //try{
            let buyer = AssetBuyer.getAssetBuyerForProvidedOrders(provider,orders);

            const buyQuote = await buyer.getBuyQuoteAsync(order.makerAssetData, new ZeroEx.BigNumber(1), {
                slippagePercentage: 0,
                feePercentage: 0.03
            });
            console.log(buyQuote)

            
            

            const contractWrappers = new ZeroEx.ContractWrappers(provider, { networkId: 42 }); // do it on Kovan
            txHash = await contractWrappers.forwarder.marketBuyOrdersWithEthAsync(
              [order],
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
          */
          
          
            //txHash = await buyer.executeBuyQuoteAsync(buyQuote,{feeRecipient:"0x0000000000000000000000000000000000000000",gasLimit: 400000});
        /*}
        catch(error)
        {
            console.log(error);
        }*/



    },

    _getRandomFutureDateInSeconds: function(){
      const ONE_SECOND_MS = 1000;
      const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
      const TEN_MINUTES_MS = ONE_MINUTE_MS * 10;
      return new ZeroEx.BigNumber(Date.now() + TEN_MINUTES_MS).div(ONE_SECOND_MS).ceil();
    }
  }
});


/*
http://0x-instant-staging.s3-website-us-east-1.amazonaws.com/?networkId=42&assetData=0xf47261b00000000000000000000000002002d3812f58e35f0ea1ffbf80a75a38c32175fa&liquiditySource=provided

zeroExInstant.render({
        orderSource: 'https://api.openrelay.xyz/v2/',
        availableAssetDatas: [assetData],
        networkId: 1,

        additionalAssetMetaDataMap: {
            '0x0257179200000000000000000000000006012c8cf97bead5deae237070f9587f8e7a266d00000000000000000000000000000000000000000000000000000000000f5792': {
                assetProxyId: '0x02571792', // ERC721 Proxy Id 
                decimals: 18,
                symbol: 'CK',
                name: 'My Custom Token',
                primaryColor: '#F2F7FF', // Optional 
                //iconUrl: 'https://cdn.icons.com/my_icon.svg', // Optional
                imageUrl: 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/18.svg'

            }
          }
        }, 'body');



orderSource: 'https://api.radarrelay.com/0x/v2/',
        availableAssetDatas: [assetData],
        networkId: 3,

        additionalAssetMetaDataMap: {
            '0x025717920000000000000000000000008ed210af6e642333cf7bb69bcdacfde68d243132000000000000000000000000000000000000000000000000000000000042191f': {
                assetProxyId: '0x02571792', // ERC721 Proxy Id 
                decimals: 18,
                symbol: 'CK',
                name: 'My Custom Token',
                primaryColor: '#F2F7FF', // Optional 
                //iconUrl: 'https://cdn.icons.com/my_icon.svg', // Optional
                imageUrl: 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/18.svg'

            }
          }
        }, 'body');
  */