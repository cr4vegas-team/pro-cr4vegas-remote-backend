import { ControlService } from './../control/control.service';
import { ControlEntity } from './../control/control.entity';
import { OrderExceptionMSG } from './order-exception.msg';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRO, OrdersRO } from './order.interfaces';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderUpdateDto } from './dto/order-update.dto';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly _orderRepository: Repository<OrderEntity>,
        private readonly _controlService: ControlService,
    ) { }

    async findAll(): Promise<OrdersRO> {
        const qb = this._orderRepository.createQueryBuilder('orders');
        const orders: OrderEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { orders, count };
    }

    async findAllByControlid(controlId: number): Promise<OrdersRO> {
        const qb = this._orderRepository.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.control', 'control')
            .where('control.id = :controlId', { controlId });
        const orders: OrderEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { orders, count };
    }

    async insertOne(orderCreateDto: OrderCreateDto): Promise<OrderRO> {
        const orderEntity: OrderEntity = plainToClass(OrderEntity, orderCreateDto);
        const foundControl: ControlEntity = (await this._controlService.findOneById(orderCreateDto.control)).control;
        orderEntity.control = foundControl;
        const savedOrder: OrderEntity = await this._orderRepository.save(orderEntity);
        return { order: savedOrder };
    }

    async updateOne(orderUpdateDto: OrderUpdateDto): Promise<OrderRO> {
        let foundOrder: OrderEntity = await this._orderRepository.createQueryBuilder('orders')
            .where('orders.id = :id', { id: orderUpdateDto.id })
            .getOne();
        if (!foundOrder) {
            throw new NotFoundException(OrderExceptionMSG.NOT_FOUND);
        }
        foundOrder = plainToClassFromExist(foundOrder, orderUpdateDto);
        const foundControl: ControlEntity = (await this._controlService.findOneById(orderUpdateDto.control)).control;
        foundOrder.control = foundControl;
        const savedOrder: OrderEntity = await this._orderRepository.save(foundControl);
        return { order: savedOrder };

    }

    async deactivate(id: number): Promise<boolean> {
        const foundOrder: OrderEntity = await this._orderRepository.createQueryBuilder('orders')
            .where('orders.id = :id', { id })
            .getOne();
        if (!foundOrder) {
            throw new NotFoundException(OrderExceptionMSG.NOT_FOUND);
        }
        const updateResult: UpdateResult = await this._orderRepository.update(id, { active: 0 });
        return updateResult.affected > 0;
    }

    async activate(id: number): Promise<boolean> {
        const foundOrder: OrderEntity = await this._orderRepository.createQueryBuilder('orders')
            .where('orders.id = :id', { id })
            .getOne();
        if (!foundOrder) {
            throw new NotFoundException(OrderExceptionMSG.NOT_FOUND);
        }
        const updateResult: UpdateResult = await this._orderRepository.update(id, { active: 1 });
        return updateResult.affected > 0;
    }

}
