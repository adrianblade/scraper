export interface HtmlRetriever {
    getHtml: (hostname: string, path: string) => Promise<string>
}