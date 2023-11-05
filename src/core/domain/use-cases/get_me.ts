import { User } from "telegram-bot-ts-types";
import { TelegramRepository } from "../../repositories/telegram_repository";
import { Failure } from "../entities/failures";

export class GetMe {
    private telegramRepository: TelegramRepository;

    constructor(telegramRepository: TelegramRepository) {
        this.telegramRepository = telegramRepository;
    }

    async execute(): Promise<User | Failure> {
        return await this.telegramRepository.getMe();
    }
}