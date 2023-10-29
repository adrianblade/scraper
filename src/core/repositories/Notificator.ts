export interface Notificator {
    sendNotification: (message: String) => Promise<void>
}