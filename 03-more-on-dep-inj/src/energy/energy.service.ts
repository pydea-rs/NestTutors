import { Injectable } from '@nestjs/common';

@Injectable()
export class EnergyService {
    currentLevel: number;
    constructor() {
        this.currentLevel = 1000;
    }
    consume(joules: number) {
        this.currentLevel -= joules;
    }

    public get level(): number {
        return this.currentLevel;
    }
}
