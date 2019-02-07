# MouserBoard #

MouserBoard is the board for crypto gamers.

* Discover - Track and talk about the last released and rarest collectibles
* Connect - Connect with top gamers and follow their activity and updates
* Collect - Start your collection with just a few clicks. Play, trade, earn!

Following video showcases a potential interaction happening on MouserBoard, thus implementing a discovery and communication layer on top of Ethereum.
[Demo video](https://youtu.be/NvzB3Sd8abw)

### Introduction###

MouserBoard has been developed during the [0x + Coinlist hackathon](https://coinlist.co/build/0x).
This proof of concept implements 0x for trading NFTs, specifically collectibles and in-game assets.

0x has been integrated to run on Kovan testnet, mint a fake ERC721 token at runtime, and let the user perform the buy transaction.

For technical details or installation on your local machine, keep reading.

### Pre-requirements ###
The webapp uses Sails.js framework and MongoDB.
You will need:
* Node.js > v8.x
* MongoDB > v3.x

### Data preparation ###
MouserBoard extracts and transforms raw data from Ethereum blockchain, without integrating with any dApp-specific API.
Data is retrieved from Google BigQuery Ethereum public dataset and current implementation analyses CryptoKitties contracts only.

Current implementation focuses on processing auctions and births of Cryptokitties, in order to build following KPIs:
* Top sellers - total sales per owner
* Rarity of items - ad hoc algo to weight the rarity of kitties genes/cattributes

For testing purposes, this repository includes a small subset of the data processed by MouserBoard.
Preprocessed data from Jan 15th to Feb 4th, 2019 is available in /data folder.
Furthermore, to force the webapp to work on this subset, today date has been overridden in our code (i.e. Feb 5th, 2019).

Following section describes how to import above mentioned subset to MongoDB.

### Database ###

The webapp expects data to be available on a local MongoDB instance with the following setup:
* localhost without authentication
* database name: mouserboard
* sales data in sales collection
    PERFORM
* releases data in releases collection
    PERFORM

If you want to customise your configuration, please see:
* config 
* tablename in XXXXFILE
* tablename in XXXXFILE2

Further information on database configuration is available on Sails.js framework website.
Further information on how to install MongoDB here


### Getting started ###

clone...

npm install...

sails lift

go to localhost:1337

to perform the transaction as of the demo, you need a wallet bridge (e.g. Metamask) and switch to Kovan testnet.

### 0x integration ###

0x integration is client-side for demo purposes.
Our implementation is inspired by the [forwarder_buy_erc721_tokens scenario](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/forwarder_buy_erc721_tokens.ts) available in 0x Starter Project
A random token is minted at runtime on Kovan. So, the kitty shown in the webapp is only demonstrative.
However, the transaction is actually confirmed by the current user through his/her wallet (e.g. [TX in the video](https://kovan.etherscan.io/tx/0x2d86762f3e0d27e6e1a23efda12cc5edf87fbab0cd8980f2a145305302e0c2cb)).

The code for 0x integration can be seen here.

Future work is the implementation of the actual relayer to trade real ERC721 tokens on mainnet