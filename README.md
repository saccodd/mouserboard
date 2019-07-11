
# MouserBoard #

### Beta Release: [www.mouserboard.com](https://www.mouserboard.com) ###


MouserBoard is the board for crypto gamers.
* Discover - Track and talk about the last released and rarest collectibles
* Connect - Connect with top gamers and follow their activity and updates
* Collect - Start your collection with just a few clicks. Play, trade, earn!

Following video showcases a potential interaction happening on MouserBoard, thus implementing a discovery and communication layer on top of Ethereum.

* [Demo video](https://youtu.be/NvzB3Sd8abw)

  

### Introduction ###

MouserBoard has been developed during the [0x + Coinlist hackathon](https://coinlist.co/build/0x). 

This proof of concept implements 0x for trading NFTs, specifically collectibles and in-game assets.

[0x](https://0x.org/) has been integrated to run on Kovan testnet, mint a fake ERC721 token at runtime, and let the user perform the buy transaction.

For technical details or installation on your local machine, keep reading.


### Pre-requirements ###

The webapp uses [Sails.js framework](https://sailsjs.com/) and MongoDB.

You will need:

*  [Node.js](https://nodejs.org/) > v8.x

*  [MongoDB](https://www.mongodb.com/) > v3.x
  

### Data preparation ###

MouserBoard extracts and transforms raw data from Ethereum blockchain, without integrating with any dApp-specific API.

Data is retrieved from [Google BigQuery Ethereum public dataset](https://cloud.google.com/bigquery/public-data/) and current implementation analyses [CryptoKitties](https://www.cryptokitties.co/catalogue) contracts only.

Current implementation focuses on processing auctions and births of kitties, in order to build following KPIs:

* Top sellers - total sales per owner

* Rarity of items - ad hoc algo to weight the rarity of kitties genes/cattributes

For testing purposes, this repository includes a small subset of the data processed by MouserBoard.

Preprocessed data from Jan 15th to Feb 4th, 2019 is available in [./data](https://github.com/saccodd/mouserboard/tree/master/data) folder.

Furthermore, to force the webapp to work on this subset, today date has been overridden in our code (i.e. Feb 4th, 2019).

Following section describes how to import above mentioned subset to MongoDB.


### Database ###

The webapp expects data to be available on a local MongoDB instance with the following setup:

* localhost without authentication on port 27017

* database name: __mouserboard__

* sales data in __sales_subset__ collection

		mongoimport --db mouserboard --collection sales_subset --type tsv --file ./data/sales_subset.csv --headerline

* releases data in __releases_subset__ collection

		mongoimport --db mouserboard --collection releases_subset --type tsv --file ./data/releases_subset.csv --headerline


If you need to customise your configuration, please see:

*  [datastore config file](https://github.com/saccodd/mouserboard/blob/master/config/datastores.js)

*  _tablename_ in [sales model](https://github.com/saccodd/mouserboard/blob/master/api/models/Sales.js)

*  _tablename_ in [releases model](https://github.com/saccodd/mouserboard/blob/master/api/models/Releases.js)


Further information on database configuration is available on [Sails.js framework website](https://sailsjs.com/documentation/concepts/models-and-orm).

  
### Getting started ###

After setting up the database, clone this repository and run:

	npm install

Run the webapp:

	sails lift

The webapp will be available at _localhost:1337_

To perform the transaction as of the demo, you need a wallet bridge (e.g. [Metamask](https://metamask.io/)) and switch to Kovan testnet.


### 0x integration ###

[0x](https://0x.org/) integration is client-side for demo purposes.

Our implementation is inspired by the [forwarder_buy_erc721_tokens scenario](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/forwarder_buy_erc721_tokens.ts) available in 0x Starter Project.

A random token is minted at runtime on Kovan. So, the kitty shown in the webapp is only demonstrative.

However, the transaction is actually confirmed by the current user through his/her wallet (e.g. [TX in the video](https://kovan.etherscan.io/tx/0x2d86762f3e0d27e6e1a23efda12cc5edf87fbab0cd8980f2a145305302e0c2cb)).

The code for 0x integration is provided [here](https://github.com/saccodd/mouserboard/blob/master/assets/js/pages/token.page.js).

Future work is the implementation of the actual relayer to trade real ERC721 tokens on mainnet
