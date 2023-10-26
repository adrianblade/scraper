import cheerio from "cheerio";
import { EcommerceCrawler } from "../../core/repositories/EcommerceCrawler";
import fs from "fs"

export class AdidasEcommerceCrawler implements EcommerceCrawler {

    getSneakersTable = (html: string): cheerio.Cheerio => {
        const $ = cheerio.load(html);
        const sneakersElements = $(
            "html body"
        );
        fs.writeFile('output.html', $($(sneakersElements)).html(), (err) => {

            // In case of a error throw err. 
            if (err) throw err;
        })
        return sneakersElements;
    }

    parseSneakers = (table: cheerio.Element): Sneaker[] => {
        const sneakers: Sneaker[] = [];

        const $ = cheerio.load(table);
        $(".row").each((_, row) => {
            // console.log($($(row)).html())
            /*const href = $($(row).find('.product-card__link-overlay')).prop('href')
            const prices = $($(row).find('.product-card__price')).text()
                .split("€")
                .filter(function (el) { return el != ''; })*/

            /*sneakers.push({
                //id: Number($($(row).children()[0]).text()),
                name: $($(row).find('.product-card__title')).text(),
                prices: prices
                    .map((element) => parseFloat(element.replace(",", ".").trim()))
                    .map(Number),
                href
            });*/
        });
        return sneakers;
    }
}