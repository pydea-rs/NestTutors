import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>) {} // repo short for: reportRepository

    indirectCreate(price: number, model: string, color: string) {
        // Standard way; but for testing and tutorial purposes, the Direct saving is used here,
        const report = this.repo.create({price, model, color})
        return this.repo.save(report);
    }
    create(userId: number, price: number, model: string, color: string) {
        return this.repo.save({userId, price, model, color}); // for now
    }

    findAll() {
        return this.repo.find();
    }
}
