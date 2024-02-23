import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { PostReportDto } from 'src/dtos/post-report.dto';
import { ReportService } from './report.service';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) {}

    @Post()
    create(@Body() body: PostReportDto, @CurrentUser() user: User) {
        if(!user)
            throw new UnauthorizedException('You must login first!');
        const {price, model, color} = body;
        return this.reportService.create(user.id, price, model, color);
    }

    @Get()
    getAll() {
        return this.reportService.findAll();
    }
}
