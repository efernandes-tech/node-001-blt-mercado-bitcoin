//index.js
require("dotenv-safe").load()

const MercadoBitcoin = require("./api").MercadoBitcoin
const MercadoBitcoinTrade = require("./api").MercadoBitcoinTrade

// BTC: Bitcoin
// BCH: Bitcoin Cash
// LTC: Litecoin
var infoApi = new MercadoBitcoin({ currency: 'BTC' })

var tradeApi = new MercadoBitcoinTrade({
    currency: 'BTC',
    key: process.env.KEY,
    secret: process.env.SECRET,
    pin: process.env.PIN
})

// setInterval(
//     () => infoApi.ticker((tick) => console.log(tick.ticker)),
//     process.env.CRAWLER_INTERVAL
// )

setInterval(() =>
    infoApi.ticker((response) => {
        console.log(response.ticker)

        // Compra quando bater 10000.
        /*if(response.ticker.sell <= 10000){
            tradeApi.placeBuyOrder(1, 10000,
                (data) => console.log('Ordem de compra inserida no livro. ' + data),
                (data) => console.log('Erro ao inserir ordem de compra no livro. ' + data))
        }else{
            console.log('Ainda muito alto, vamos esperar pra comprar depois.')
        }*/

        // Compra quando bater 10000 e vende quando subir 3%.
        if(response.ticker.sell <= 10000){
            tradeApi.placeBuyOrder(1, 10000,
                (data) => {
                    console.log('Ordem de compra inserida no livro. ' + data)
                    // operando em STOP de 3%
                    tradeApi.placeSellOrder(1, 10300,
                        (data) => console.log('Ordem de venda inserida no livro. ' + data),
                        (data) => console.log('Erro ao inserir ordem de venda no livro. ' + data))
                },
                (data) => console.log('Erro ao inserir ordem de compra no livro. ' + data))
        }else{
            console.log('Ainda muito alto, vamos esperar pra comprar depois.')
        }
    }),
    process.env.CRAWLER_INTERVAL
)
