import { CheerioHtmlRetriever } from "../infrastructure/repositories/CheerioHtmlRetriever";
import { NikeEcommerceCrawler } from "../infrastructure/repositories/NikeEcommerceCrawler";
import { GetSneakers } from "../core/domain/use-cases/getSneakers";
import { AdidasEcommerceCrawler } from "../infrastructure/repositories/AdidasEcommerceCrawler";
import { EcommerceCrawler } from "../core/repositories/EcommerceCrawler";
import { ZalandoEcommerceCrawler } from "../infrastructure/repositories/ZalandoEcommerceCrawler";
import { TelegramRepositoryImplementation } from "../infrastructure/repositories/telegram_repository_implementation";
import dotenv from 'dotenv'
import fs from 'fs'
import { TelegramApiClient } from "../infrastructure/repositories/telegram_client";

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
const telegram_client = new TelegramApiClient(apiToken)
const telegramRepository = new TelegramRepositoryImplementation(chat_id, telegram_client);

let ecommerceCrawlertMap: Map<string, EcommerceCrawler> = new Map<string, EcommerceCrawler>();
ecommerceCrawlertMap.set('adidas', adidasEcommerceCrawler)
ecommerceCrawlertMap.set('nike', nikeEcommerceCrawler)
ecommerceCrawlertMap.set('zalando', zalandoEcommerceCrawler)


const getSneakers = new GetSneakers(cheerioHtmlRetriever, ecommerceCrawlertMap)

//NIKE
/*getSneakers.execute("https://www.nike.com", "/es/w?q=air%20force%201&vst=air%20force")
    .then((sneakers) => console.log(sneakers))
    .catch((error) => console.log(error));*/

//ADIDAS IN PROGRESS
/*getSneakers.execute("https://www.adidas.es", "/accesorios-gimnasio_y_entrenamiento")
    .then((sneakers) => console.log(sneakers))
    .catch((error) => console.log(error));*/

// ZALANDO
getSneakers.execute("https://www.zalando.es", "/catalogo/?q=air+force+1")
    .then((sneakers) => telegramRepository.sendMessage(sneakers))
    .then((msg) => console.info(msg))
    .catch((error) => console.info(error));