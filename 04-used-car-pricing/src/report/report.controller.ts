import { Body, Controller, Post } from '@nestjs/common';
import { ReportDto } from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) {}

    @Post()
    create(@Body() body: ReportDto) {
        const {price, model, color} = body;
        return this.reportService.create(price, model, color);
    }

}
