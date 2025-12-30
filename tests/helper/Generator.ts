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

    static randomPhoneNumberGenerator(): string {
        return `8${Generator.randomNumberGenerator(10)}`;
    }

    static randomNameGenerator(length: number = 8): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    static randomPasswordGenerator(length: number = 8): string {
        if (length < 8) {
            throw new Error('Password length must be at least 8 characters');
        }

        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*()-_=+[]{}<>?';

        const allChars = upper + lower + numbers + special;

        // 🔒 guarantee each requirement
        let password = [
            upper[Math.floor(Math.random() * upper.length)],
            lower[Math.floor(Math.random() * lower.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            special[Math.floor(Math.random() * special.length)],
        ];

        // fill remaining characters
        for (let i = password.length; i < length; i++) {
            password.push(allChars[Math.floor(Math.random() * allChars.length)]);
        }

        // 🔀 shuffle result
        return password
            .sort(() => Math.random() - 0.5)
            .join('');
    }
}
