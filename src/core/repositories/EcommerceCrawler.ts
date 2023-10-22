export interface EcommerceCrawler {
    getSneakersTable: (html: string) => cheerio.Cheerio;
    parseSneakers: (table: cheerio.Element) => Sneaker[];
}