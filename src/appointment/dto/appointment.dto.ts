import { IsDateString, IsString } from "class-validator";

export class AppointmentCreateDto {
    @IsString()
    name: string

    @IsString()
    lastName: string

    @IsString()
    birthDate: string

    @IsDateString()
    date: string

    @IsString()
    phone: string

    @IsString()
    expertId: string
}
