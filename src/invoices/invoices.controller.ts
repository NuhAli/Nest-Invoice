import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller('invoices')
export class InvoicesController {
  constructor(private prismaService:PrismaService) {

  }
  @Get()
  getAllInvoices(){
    const invoices = this.prismaService.invoice.findMany()
    return invoices
  }
}
