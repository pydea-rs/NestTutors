import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { EnergyModule } from 'src/energy/energy.module';
import { EndorphinModule } from 'src/endorphin/endorphin.module';

@Module({
  providers: [MusicService],
  imports: [EnergyModule, EndorphinModule],
  exports: [MusicService]
})
export class MusicModule {}
