import { Body, Controller, Get, Post } from '@nestjs/common';
import { HumanService } from './human.service';
import { MinutesDto } from './dtos/minutes.dto';

@Controller()
export class HumanController {
  constructor(private readonly humanService: HumanService) {}

  @Get()
  getStatus() {
    return this.humanService.status;
  }

  @Post('/music')
  listenMusic(@Body() body: MinutesDto) {
    return this.humanService.listenMusic(body.minutes);
  }

  @Post('/exercise')
  doExercise(@Body() body: MinutesDto) {
    return this.humanService.doExercise(body.minutes);
  }
}
