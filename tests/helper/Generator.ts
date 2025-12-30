export class Generator {
    static randomStringGenerator(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result;
    }

    static randomNumberGenerator(length: number = 6): number {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return parseInt(result);
    }

    static randomEmailGenerator(): string {
        return `${Generator.randomStringGenerator(8)}@${Generator.randomStringGenerator(4)}.com`;
    }
}
