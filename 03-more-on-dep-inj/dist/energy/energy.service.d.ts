export declare class EnergyService {
    currentLevel: number;
    constructor();
    consume(joules: number): void;
    get level(): number;
}
