import { Failure, FailureApi, FailureUnauthorized } from "../../core/domain/entities/failures";

interface ApiClient {
    token: string;
    execute(command: string, body?: string): Promise<string | Failure>;
}

class TelegramApiClient implements ApiClient {
    token: string;

    constructor(token: string) {
        this.token = encodeURI(token);
    }

    async execute(command: string, body?: string): Promise<string | Failure> {
        let response = await fetch('https://api.telegram.org/bot' + this.token + '/' + command,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        });

        if (response.status !== 200) {
            if (response.status === 401) {
                return new FailureUnauthorized(await response.text());
            }
            return new FailureApi(await response.text());
        }
        return await response.text();
    }
}

export { ApiClient, TelegramApiClient };