//index.js
require("dotenv-safe").load()

const MercadoBitcoin = require("./api").MercadoBitcoin

// BTC: Bitcoin
// BCH: Bitcoin Cash
// LTC: Litecoin
var infoApi = new MercadoBitcoin({ currency: 'BTC' })

setInterval(
    () => infoApi.ticker((tick) => console.log(tick.ticker)),
    process.env.CRAWLER_INTERVAL
)