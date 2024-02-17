import { ForbiddenException, Injectable } from '@nestjs/common';
import { EndorphinService } from 'src/endorphin/endorphin.service';
import { EnergyService } from 'src/energy/energy.service';

@Injectable()
export class MusicService {

    constructor(private endorphinService: EndorphinService, private energyService: EnergyService) {}

    listen(minutes: number): {[key: string]: number} {
        if(this.energyService.level <= 0)
            throw new ForbiddenException('Cannot do any more work. This human has fallen sleep!');
        this.energyService.consume(minutes / 20);
        this.endorphinService.produce(minutes / 4);
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
