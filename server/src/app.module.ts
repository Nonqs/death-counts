import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [PrismaModule, AuthModule, GroupModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
