import { CheerioHtmlRetriever } from "../infrastructure/repositories/CheerioHtmlRetriever";
import { NikeEcommerceCrawler } from "../infrastructure/repositories/NikeEcommerceCrawler";
import { GetSneakers } from "../core/domain/use-cases/getSneakers";

const cheerioHtmlRetriever = new CheerioHtmlRetriever();
const nikeEcommerceCrawler = new NikeEcommerceCrawler();

const getSneakers = new GetSneakers(cheerioHtmlRetriever, nikeEcommerceCrawler)

getSneakers.execute("https://www.nike.com", "/es/w?q=air%20force%201&vst=air%20force")
    .then((users) => console.log(users))
    .catch((error) => console.log(error));