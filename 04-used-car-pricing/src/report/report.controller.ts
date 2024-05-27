import { Body, Controller, Post } from '@nestjs/common';
import { PostReportDto } from '../dtos/post-report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) {}

    @Post()
    create(@Body() body: PostReportDto) {
        const {price, model, color} = body;
        return this.reportService.create(price, model, color);
    }

}
