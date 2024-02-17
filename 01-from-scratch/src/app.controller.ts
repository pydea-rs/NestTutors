import { Controller, Get } from "@nestjs/common";


@Controller('/app')
export class AppController {
    @Get()
    getMainRoute() {
        return "HI Asshole!";
    }

    @Get('/bye')
    getByeRoute() {
        return "Bye Asshole!";
    }
}