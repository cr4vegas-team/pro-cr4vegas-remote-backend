import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderRO, OrdersRO } from './order.interfaces';
import { OrderService } from './order.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {

    constructor(
        private readonly _orderService: OrderService
    ) { }

    @Get()
    findAll(): Promise<OrdersRO> {
        return this._orderService.findAll();
    }

    @Get(':controlId')
    findAllByControlId(@Param('controlId') controlId: number): Promise<OrdersRO> {
        return this._orderService.findAllByControlid(controlId);
    }

    @Post()
    insertOne(@Body() orderCreateDto: OrderCreateDto): Promise<OrderRO> {
        return this._orderService.insertOne(orderCreateDto);
    }

    @Put()
    updateOne(@Body() orderUpdateDto: OrderUpdateDto): Promise<OrderRO> {
        return this._orderService.updateOne(orderUpdateDto);
    }

    @Patch(':id')
    activate(@Param('id') id: number): Promise<boolean> {
        return this._orderService.activate(id);
    }

    @Delete(':id')
    deactivate(@Param('id') id: number): Promise<boolean> {
        return this._orderService.deactivate(id);
    }
}
