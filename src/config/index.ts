import { CheerioHtmlRetriever } from "../infrastructure/repositories/CheerioHtmlRetriever";
import { NikeEcommerceCrawler } from "../infrastructure/repositories/NikeEcommerceCrawler";
import { GetSneakers } from "../core/domain/use-cases/getSneakers";
import { AdidasEcommerceCrawler } from "../infrastructure/repositories/AdidasEcommerceCrawler";
import { EcommerceCrawler } from "../core/repositories/EcommerceCrawler";
import { ZalandoEcommerceCrawler } from "../infrastructure/repositories/ZalandoEcommerceCrawler";
import { TelegramNotificator } from "../infrastructure/repositories/TelegramNotificator";
import dotenv from 'dotenv'
import fs from 'fs'

const cheerioHtmlRetriever = new CheerioHtmlRetriever();

const adidasEcommerceCrawler = new AdidasEcommerceCrawler();
const nikeEcommerceCrawler = new NikeEcommerceCrawler();
const zalandoEcommerceCrawler = new ZalandoEcommerceCrawler();

let localOrNot = () : string => {
    return fs.existsSync('.env.local') ? '.env.local' : '.env'
}

dotenv.config(({ path: localOrNot() }))
const apiToken = process.env.TELEGRAM_API_TOKEN
const chat_id = process.env.TELEGRAM_CHAT_ID
const notificator = new TelegramNotificator(apiToken, chat_id);

let ecommerceCrawlertMap: Map<string, EcommerceCrawler> = new Map<string, EcommerceCrawler>();
ecommerceCrawlertMap.set('adidas', adidasEcommerceCrawler)
ecommerceCrawlertMap.set('nike', nikeEcommerceCrawler)
ecommerceCrawlertMap.set('zalando', zalandoEcommerceCrawler)


const getSneakers = new GetSneakers(cheerioHtmlRetriever, ecommerceCrawlertMap)

//NIKE
getSneakers.execute("https://www.nike.com", "/es/w?q=air%20force%201&vst=air%20force")
    .then((users) => console.log(users))
    .catch((error) => console.log(error));

//ADIDAS IN PROGRESS
/*getSneakers.execute("https://www.adidas.es", "/accesorios-gimnasio_y_entrenamiento")
    .then((users) => console.log(users))
    .catch((error) => console.log(error));*/

// ZALANDO
getSneakers.execute("https://www.zalando.es", "/catalogo/?q=air+force+1")
    .then((users) => console.log(users))
    .catch((error) => console.log(error));

//notificator.sendNotification("hello from there!")