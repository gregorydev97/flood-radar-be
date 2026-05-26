import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReportDto } from "./dto/create-report.dto";

@Injectable()
export class ReportsService {
    constructor(private readonly prisma: PrismaService) {}

    async createReport(userId: string, createReportDto: CreateReportDto) {
        const newReport = await this.prisma.report.create({
            data: {
                userId,
                latitude: createReportDto.latitude,
                longitude: createReportDto.longitude,
                severity: createReportDto.severity,
                comment: createReportDto.comment,
            },
            select: {
                id: true,
                userId: true,
                latitude: true,
                longitude: true,
                severity: true,
                comment: true,
                status: true,
                createdAt: true,
            },
        });

        return newReport;
    }
}
