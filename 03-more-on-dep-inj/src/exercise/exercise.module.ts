import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { EnergyModule } from 'src/energy/energy.module';
import { EndorphinModule } from 'src/endorphin/endorphin.module';

@Module({
  providers: [ExerciseService],
  imports: [EnergyModule, EndorphinModule],
  exports: [ExerciseService]
})
export class ExerciseModule {}
