import cheerio from "cheerio";
import { EcommerceCrawler } from "../../core/repositories/EcommerceCrawler";

export class NikeEcommerceCrawler implements EcommerceCrawler {
    
    getSneakersTable = (html: string) : cheerio.Cheerio => {
        const $ = cheerio.load(html);
        const sneakersElements = $(
        "html body div#experience-wrapper div#__next div#Wall div.results div.results__body div.product-grid .product-card"
    );
    return sneakersElements;
    }

    parseSneakers = (table: cheerio.Element) : Sneaker[] => {
        const sneakers: Sneaker[] = [];

        const $ = cheerio.load(table);
        $(".product-card").each((_, row) => {
            const href = $($(row).find('.product-card__link-overlay')).prop('href')
            const prices = $($(row).find('.product-card__price')).text()
            .split("€")
            .filter(function (el) { return el != ''; })
            
            sneakers.push({
                //id: Number($($(row).children()[0]).text()),
                name: $($(row).find('.product-card__title')).text(),
                prices: prices
                    .map((element) => parseFloat(element.replace(",", ".").trim()))
                    .map(Number),
                href
            });
        });
        return sneakers;
    }
}