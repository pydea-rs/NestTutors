import { EndorphinService } from 'src/endorphin/endorphin.service';
import { EnergyService } from 'src/energy/energy.service';
export declare class ExerciseService {
    private endorphinService;
    private energyService;
    constructor(endorphinService: EndorphinService, energyService: EnergyService);
    do(minutes: number): {
        [key: string]: number;
    };
    get energyLevel(): number;
    get endorphinLevel(): number;
    get status(): {
        [key: string]: number;
    };
}
