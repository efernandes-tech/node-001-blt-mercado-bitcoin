//MERCADO BITCOIN
const unirest = require('unirest')
const ENDPOINT_API = 'https://www.mercadobitcoin.com.br/api/'

var MercadoBitcoin = function (config) {
    this.config = {
        CURRENCY: config.currency
    }
}

MercadoBitcoin.prototype = {

    ticker: function (success) {
        this.call('ticker', success);
    },

    orderBook: function (success) {
        this.call('orderbook', success);
    },

    trades: function (success) {
        this.call('trades', success);
    },

    call: function (method, success) {

        unirest.get(ENDPOINT_API + this.config.CURRENCY + '/' + method)
            .headers('Accept', 'application/json')
            .end(function (response) {
                try{
                    success(JSON.parse(response.raw_body));
                }
                catch(ex){ console.log(ex)}
        });
    }
}

module.exports = {MercadoBitcoin}