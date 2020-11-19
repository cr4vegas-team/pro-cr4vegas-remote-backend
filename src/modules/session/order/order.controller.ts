import { OrderExceptionMSG } from './order-exception.msg';
import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderRO, OrdersRO } from './dto/order-response.dto';
import { OrderService } from './order.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @Get()
  findAll(): Promise<OrdersRO> {
    return this._orderService.findAll();
  }

  @Get(':sessionId')
  findAllBySessionId(@Param('sessionId') sessionId: number): Promise<OrdersRO> {
    return this._orderService.findAllByControlid(sessionId);
  }

  @Post()
  insertOne(@Body() orderCreateDto: OrderCreateDto): Promise<OrderRO> {
    return this._orderService.insertOne(orderCreateDto);
  }

  @ApiNotFoundResponse({ description: OrderExceptionMSG.NOT_FOUND })
  @Put()
  updateOne(@Body() orderUpdateDto: OrderUpdateDto): Promise<OrderRO> {
    return this._orderService.updateOne(orderUpdateDto);
  }

  @ApiNotFoundResponse({ description: OrderExceptionMSG.NOT_FOUND })
  @Patch(':id')
  activate(@Param('id') id: number): Promise<boolean> {
    return this._orderService.activate(id);
  }

  @ApiNotFoundResponse({ description: OrderExceptionMSG.NOT_FOUND })
  @Delete(':id')
  deactivate(@Param('id') id: number): Promise<boolean> {
    return this._orderService.deactivate(id);
  }
}
