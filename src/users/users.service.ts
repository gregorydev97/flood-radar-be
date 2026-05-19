import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          authProvider: true,
          createdAt: true,
        },
      });

      return newUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
