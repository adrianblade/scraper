import { HtmlRetriever } from "../../core/repositories/HtmlRetriever";

export class CheerioHtmlRetriever implements HtmlRetriever {

    getHtml = async (hostname: string, path: string): Promise<string> => {
        const response = await fetch(hostname + path, { headers: { 'Content-Type': 'text/html' } })
        return response.text()
    }
}


