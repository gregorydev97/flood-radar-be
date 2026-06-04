import { BadRequestException, NotFoundException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { GetReportsQueryDto } from "./dto/get-reports-query.dto";

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

    async findAll(query: GetReportsQueryDto) {
        const { north, south, east, west } = query;

        const hasMapBounds =
            north !== undefined &&
            south !== undefined &&
            east !== undefined &&
            west !== undefined;
        
        if (hasMapBounds && north <= south) {
            throw new BadRequestException('north must be greater than south')
            
        }

        if (hasMapBounds && east <= west) {
            throw new BadRequestException('east must be greater than west')
        }

        const where: any = {
            status: 'ACTIVE',
            deletedAt: null,
        };

        if (hasMapBounds) {
            where.latitude = {
            gte: south,
            lte: north,
        };

            where.longitude = {
            gte: west,
            lte: east,
        };
      }

       return this.prisma.report.findMany({
        where,
        orderBy: {
            createdAt: 'desc',
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

}

    async findOne(id: string) {
        const report = await this.prisma.report.findFirst({
            where: {
              id,
              status: 'ACTIVE',
              deletedAt: null,
            },
            select: {
                id: true,
                latitude: true,
                longitude: true,
                severity: true,
                comment: true,
                imageUrl: true,
                status: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },

            },
        });

        if (!report) {
            throw new NotFoundException('Report not found');
        }

        return report;
    }
}
