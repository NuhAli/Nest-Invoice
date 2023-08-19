import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { InvoicesModule } from "./invoices/invoices.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PrismaModule, InvoicesModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: []
})
export class AppModule {
}
