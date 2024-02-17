import { HumanService } from './human.service';
import { MinutesDto } from './dtos/minutes.dto';
export declare class HumanController {
    private readonly humanService;
    constructor(humanService: HumanService);
    getStatus(): {
        [key: string]: string | number;
    };
    listenMusic(body: MinutesDto): {
        [key: string]: number;
    };
    doExercise(body: MinutesDto): {
        [key: string]: number;
    };
}
