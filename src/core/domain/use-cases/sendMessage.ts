import Message from "telegram-bot-ts-types/build/entities/message"
import { Notificator } from "../../repositories/Notificator"
import { Failure } from "../entities/failures"

export class SendMessage {
    private notificator: Notificator

    execute = async (message: Sneaker[]): Promise<Message | Failure> => {
        return this.notificator.sendNotification(message)
    }

}
