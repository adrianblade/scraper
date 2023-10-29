import { Notificator } from "../../repositories/Notificator"

export class SendMessage {
    private notificator: Notificator

    execute = async (url: string, message: string): Promise<void> => {
        return this.notificator.sendNotification(message)
    }

}
