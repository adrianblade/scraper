import Message from "telegram-bot-ts-types/build/entities/message";
import { Failure } from "../domain/entities/failures";
import User from "telegram-bot-ts-types/build/entities/user";
import Update from "telegram-bot-ts-types/build/entities/update";

export interface TelegramRepository {
    getUpdates(): Promise<Update[] | Failure>;
    getMe(): Promise<User | Failure>;
    sendMessage: (sneakers: Sneaker[]) => Promise<Message | Failure>
}