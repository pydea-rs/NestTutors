import { ExerciseService } from './exercise/exercise.service';
import { MusicService } from './music/music.service';
export declare class HumanService {
    private exerciseService;
    private musicService;
    constructor(exerciseService: ExerciseService, musicService: MusicService);
    get status(): {
        [key: string]: number | string;
    };
    listenMusic(minutes: number): {
        [key: string]: number;
    };
    doExercise(minutes: number): {
        [key: string]: number;
    };
}
