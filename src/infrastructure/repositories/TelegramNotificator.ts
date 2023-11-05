import { Failure, FailureApi } from "../../core/domain/entities/failures";
import { Notificator } from "../../core/repositories/Notificator";
import { TelegramApiClient } from "./telegram_client";
import { Message } from "telegram-bot-ts-types";


const MAX_ATTEMP = 3

export class TelegramNotificator implements Notificator {
    private telegramApiClient: TelegramApiClient
    private readonly chat_id: string;

    constructor(chat_id: string, telegramApiClient: TelegramApiClient) {
		this.telegramApiClient = telegramApiClient
        this.chat_id = chat_id;
	}
    
    sendNotification = async (sneakers: Sneaker[]) : Promise<Message | Failure> => {
        let response = await this.telegramApiClient.execute('sendMessage', 
            JSON.stringify({
                chat_id: this.chat_id,
                text : this.writeSneakers(sneakers.slice(0,MAX_ATTEMP)),
                parse_mode: "HTML",
            }))
            if (response instanceof Failure) {
                return response;
            }
    
            if (!this.checkResponse(response)) {
                return new FailureApi();
            }
    
            return JSON.parse(response)['result'];
        }

        writeSneakers = (sneakers: Sneaker[]) : string => {
            let result = ""
            sneakers.forEach((sneaker) => result += this.writeSneaker(sneaker))
            return result
        }

        writeSneaker = (sneaker: Sneaker) : string => {
            return `
            <b>${sneaker.name}</b>
            <b>${sneaker.prices[0]}</b>
            <a href="${sneaker.href}">${sneaker.name}</a> 
            `
        }

        private checkResponse(response: string): boolean {
            try {
                let jsonResponse = JSON.parse(response);
                return (typeof jsonResponse === 'object' && 'ok' in jsonResponse && 'result' in jsonResponse && jsonResponse.ok);
            } catch (e) { }
    
            return false;
        }
}
