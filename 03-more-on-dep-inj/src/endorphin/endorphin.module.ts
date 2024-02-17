import { Module } from '@nestjs/common';
import { EndorphinService } from './endorphin.service';

@Module({
  providers: [EndorphinService],
  exports: [EndorphinService]
})
export class EndorphinModule {}
