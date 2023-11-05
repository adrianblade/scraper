import Message from "telegram-bot-ts-types/build/entities/message";
import { Failure } from "../domain/entities/failures";

export interface Notificator {
    sendNotification: (sneakers: Sneaker[]) => Promise<Message | Failure>
}