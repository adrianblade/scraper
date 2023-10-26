import cheerio from "cheerio";
import { EcommerceCrawler } from "../../core/repositories/EcommerceCrawler";
import fs from "fs"

export class ZalandoEcommerceCrawler implements EcommerceCrawler {

    getSneakersTable = (html: string): cheerio.Cheerio => {
        const $ = cheerio.load(html);
        const sneakersElements = $(
            "html body div#main-content > div div[data-zalon-partner-target=true]"
        );

        return sneakersElements;
    }

    parseSneakers = (table: cheerio.Element): Sneaker[] => {
        const sneakers: Sneaker[] = [];

        const $ = cheerio.load(table);
        $("article").each((_, row) => {
            const href = $($(row).find('a')).prop('href')
            const prices = $($(row).find('section > p:first > span:last')).text()
                .split("€")
                .filter(function (el) { return el != ''; })

            sneakers.push({
                name: $($(row).find('h3')).text(),
                prices: prices
                    .map((element) => parseFloat(element.replace(",", ".").trim()))
                    .map(Number),
                href
            });
        });
        return sneakers;
    }
}