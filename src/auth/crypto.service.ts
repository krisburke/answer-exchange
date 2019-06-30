import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
    async hashString(str: string): Promise<string> {
        return argon2.hash(str, {
            type: argon2.argon2i,
        });
    }

    async verifyHash(hash: string, plain: string) {
        return argon2.verify(hash, plain);
    }

    getRandomizedToken() {
        return crypto.randomBytes(32).toString('hex');
    }
}
