import Message from "telegram-bot-ts-types/build/entities/message"
import { TelegramRepository } from "../../repositories/telegram_repository"
import { Failure } from "../entities/failures"

export class SendMessage {
    private telegramRepository: TelegramRepository

    execute = async (message: Sneaker[]): Promise<Message | Failure> => {
        return this.telegramRepository.sendMessage(message)
    }

}
