import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>) {} // repo short for: reportRepository

    create(price: number, model: string, color: string) {
        return this.repo.save({price, model, color}); // for now
    }
}
