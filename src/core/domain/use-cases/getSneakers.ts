import { EcommerceCrawler } from "../../repositories/EcommerceCrawler"
import { HtmlRetriever } from "../../repositories/HtmlRetriever"

export class GetSneakers {
    private htmlRetriever: HtmlRetriever
    private ecommerceCrawler: Map<string, EcommerceCrawler>

    constructor(htmlRetriever: HtmlRetriever, ecommerceCrawler: Map<string, EcommerceCrawler>) {
        this.htmlRetriever = htmlRetriever
        this.ecommerceCrawler = ecommerceCrawler
    }

    execute = async (hostname: string, path: string): Promise<Sneaker[]> => {
        console.log("Searching on : " + hostname + path)
        const ecommerceName = this.ecommerceName(hostname)
        return this.htmlRetriever.getHtml(hostname, path)
            .then(this.ecommerceCrawler.get(ecommerceName).getSneakersTable)
            .then((tables) => {
                let sneakers: Sneaker[] = [];
                tables.each((_, table) => (sneakers = sneakers.concat(this.ecommerceCrawler.get(ecommerceName).parseSneakers(table))));
                return sneakers;
            })
    }

    ecommerceName = (hostname: string): string => {
        if ("https://www.nike.com" === hostname) {
            return "nike"
        } else if ("https://www.adidas.es" === hostname) {
            return "adidas"
        } else if ("https://www.zalando.es" === hostname) {
            return "zalando"
        }
    }
}