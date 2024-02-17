import { ForbiddenException, Injectable } from '@nestjs/common';
import { EndorphinService } from 'src/endorphin/endorphin.service';
import { EnergyService } from 'src/energy/energy.service';

@Injectable()
export class ExerciseService {

    constructor(private endorphinService: EndorphinService, private energyService: EnergyService) {}

    do(minutes: number): {[key: string]: number} {
        if(this.energyService.level <= 0)
            throw new ForbiddenException('Cannot do any more work. This human has fallen sleep!');
        if(this.energyService.level < 10)
            throw new ForbiddenException("This human is too fuckin Exhausted for exercising. Leave him alone moron!")

        this.energyService.consume(minutes * 0.5);
        if(minutes > 30) {
            // when exercising, endorphine will be genrated after half an hour of continues exercise
            this.endorphinService.produce((minutes - 30)); // after 30 minutes, each minute will produce 1 unit of endorphins, this is actually all made up amount
        }
        return this.status;
    }


    public get energyLevel(): number {
        return this.energyService.level;
    }

    public get endorphinLevel(): number {
        return this.endorphinService.level;
    }

    public get status(): {[key: string]: number} {
        return {endorphins: this.endorphinLevel, energy: this.energyLevel};
    }
}
