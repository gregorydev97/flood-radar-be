import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ReportSeverity } from '../../generated/prisma/client';

export class CreateReportDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;

  @IsEnum(ReportSeverity)
  severity!: ReportSeverity;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}