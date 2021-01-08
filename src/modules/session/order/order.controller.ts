import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderRO, OrdersRO } from './dto/order-response.dto';
import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderExceptionMSG } from './order-exception.msg';
import { OrderService } from './order.service';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly _orderService: OrderService) { }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @Get()
  findAll(): Promise<OrdersRO> {
    return this._orderService.findAll();
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @Get(':sessionId')
  findAllBySessionId(@Param('sessionId') sessionId: number): Promise<OrdersRO> {
    return this._orderService.findAllByControlid(sessionId);
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @Post()
  insertOne(@Body() orderCreateDto: OrderCreateDto): Promise<OrderRO> {
    return this._orderService.insertOne(orderCreateDto);
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER])
  @ApiNotFoundResponse({ description: OrderExceptionMSG.NOT_FOUND })
  @Put()
  updateOne(@Body() orderUpdateDto: OrderUpdateDto): Promise<OrderRO> {
    return this._orderService.updateOne(orderUpdateDto);
  }
}
