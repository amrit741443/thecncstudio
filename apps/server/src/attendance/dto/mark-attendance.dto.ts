import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
}

export class MarkAttendanceDto {
  @IsUUID() studentId!: string;
  @IsUUID() classSessionId!: string;
  @IsEnum(AttendanceStatus) status!: AttendanceStatus;
  @IsOptional() notes?: string;
}
