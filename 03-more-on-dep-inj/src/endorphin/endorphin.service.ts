import { Injectable } from '@nestjs/common';

@Injectable()
export class EndorphinService {
    currentLevel: number;

    constructor() {
        this.currentLevel = 0;
    }

    produce(amount: number) {
        this.currentLevel += amount;
    }

    public get level(): number {
        return this.currentLevel;
    }
}
