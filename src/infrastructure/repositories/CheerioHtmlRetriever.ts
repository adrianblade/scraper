import { HtmlRetriever } from "../../core/repositories/HtmlRetriever";
import https from "https";

export class CheerioHtmlRetriever implements HtmlRetriever {

    getHtml = async (hostname: string, path: string): Promise<string> =>
    new Promise((resolve, reject) => {
        https
            .get(
                {
                    hostname,
                    path,
                    method: "GET",
                },
                (res) => {
                    let html = "";
                    res.on("data", function (chunk) {
                        html += chunk;
                    });
                    res.on("end", function () {
                        resolve(html);
                    });
                }
            )
            .on("error", (error) => {
                console.error(error);
                reject(error);
            });
    });
}


