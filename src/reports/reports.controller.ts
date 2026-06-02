import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsQueryDto } from './dto/get-reports-query.dto';
import { ReportsService } from './reports.service';

type AuthenticatedRequest = Request & {
  user: {
    sub: string;
    email: string;
  };
};

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createReportDto: CreateReportDto,
  ) {
    const userId = request.user.sub;

    return this.reportsService.createReport(userId, createReportDto);
  }

  @Get()
  findAll(@Query() query: GetReportsQueryDto) {
    return this.reportsService.findAll(query);
  }
}