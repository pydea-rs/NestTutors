import { Module } from '@nestjs/common';
import { HumanController } from './human.controller';
import { HumanService } from './human.service';
import { ExerciseModule } from './exercise/exercise.module';
import { MusicModule } from './music/music.module';

@Module({
  imports: [ExerciseModule, MusicModule],
  controllers: [HumanController],
  providers: [HumanService],
})
export class HumanModule {}
