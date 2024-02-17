import { Injectable } from '@nestjs/common';
import { ExerciseService } from './exercise/exercise.service';
import { MusicService } from './music/music.service';

@Injectable()
export class HumanService {
  constructor(
    private exerciseService: ExerciseService,
    private musicService: MusicService,
  ) { }
  get status(): { [key: string]: number|string } {
    const {energy, endorphins} = this.musicService.status;
    const happinessStates = ['Suicidal', 'Despressed', 'Sad', 'Neutral', 'Hopeful', 'Happy As Fuck!'];
    const happinessStatus: string = endorphins < 600 ? happinessStates[Math.floor(endorphins / 100)] : happinessStates[happinessStates.length - 1];
    const staminaStates = ['Sleep', 'Exhausted AF', 'Just Exhausted', 'Tired', 'Nearly Tired', 'Neutral', 'Good', 'Great', 'Energetic', 'Superman', 'Superman Plus'];
    const staminaStatus = energy >= 10 ? staminaStates[Math.ceil(energy / 100)] : energy > 0 ? staminaStates[1] : staminaStates[0];
  
    return {...this.musicService.status, staminaStatus: `This man is ${staminaStatus}.`, happinessStatus: `This man is ${happinessStatus} now.`};
  }

  listenMusic(minutes: number): {[key: string]: number} {
    return this.musicService.listen(minutes);
  }

  doExercise(minutes: number): {[key: string]: number} {
    return this.exerciseService.do(minutes);
  }
}
