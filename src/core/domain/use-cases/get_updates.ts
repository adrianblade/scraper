import { Update, User } from "telegram-bot-ts-types";
import { TelegramRepository } from "../../repositories/telegram_repository";
import { Failure } from "../entities/failures";

export class GetUpdates {
    private telegramRepository: TelegramRepository;

    constructor(telegramRepository: TelegramRepository) {
        this.telegramRepository = telegramRepository;
    }

    async execute(): Promise<Update[] | Failure> {
        return await this.telegramRepository.getUpdates();
    }
}