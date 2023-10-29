import { Notificator } from "../../core/repositories/Notificator";

export enum Telegram_ParseModes {
	MarkdownV2,
	HTML,
}

export class TelegramNotificator implements Notificator {
    private readonly apiToken: string;
    private readonly chat_id: string;

    constructor(apiToken: string, chat_id: string) {
		this.apiToken = apiToken;
        this.chat_id = chat_id;
	}
    
    sendNotification = async (text: String) : Promise<void> => {
        const endpoint = "https://api.telegram.org/bot"
        const response = await fetch(`${endpoint}${this.apiToken}/sendMessage`, 
            { 
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    chat_id: this.chat_id,
                    text,
                    //parse_mode: Telegram_ParseModes.MarkdownV2,
                })
            }
        )
        return response.json();
        }
}