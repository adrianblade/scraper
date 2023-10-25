import { EcommerceCrawler } from "../../repositories/EcommerceCrawler"
import { HtmlRetriever } from "../../repositories/HtmlRetriever"

export class GetSneakers {
    private htmlRetriever: HtmlRetriever
    private ecommerceCrawler: EcommerceCrawler

    constructor(htmlRetriever: HtmlRetriever, ecommerceCrawler: EcommerceCrawler) {
        this.htmlRetriever = htmlRetriever
        this.ecommerceCrawler = ecommerceCrawler
    }

    execute = async (hostname: string, path: string): Promise<Sneaker[]> => {
        return this.htmlRetriever.getHtml(hostname, path)
            .then(this.ecommerceCrawler.getSneakersTable)
            .then((tables) => {
                let sneakers: Sneaker[] = [];
                tables.each((_, table) => (sneakers = sneakers.concat(this.ecommerceCrawler.parseSneakers(table))));
                return sneakers;
            })
    }
}