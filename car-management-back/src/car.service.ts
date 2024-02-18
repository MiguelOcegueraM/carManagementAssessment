import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './schema/car.schema';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<CarDocument>,
  ) {}

  private calculateTotal(
    productionCost: number,
    transportationCost: number,
  ): number {
    return productionCost + transportationCost;
  }

  async create(createCarDto: CreateCarDto): Promise<CarDocument> {
    const { ProductionCost, TransportationCost } = createCarDto;
    const total = this.calculateTotal(ProductionCost, TransportationCost);
    createCarDto.Total = total;
    const car = new this.carModel(createCarDto);
    return car.save();
  }

  async findAll(): Promise<CarDocument[]> {
    return this.carModel.find().exec();
  }

  async findOne(id: string) {
    return this.carModel.findById(id);
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<CarDocument> {
    const { ProductionCost, TransportationCost } = updateCarDto;
    const total = this.calculateTotal(ProductionCost, TransportationCost);
    updateCarDto.Total = total;
    return this.carModel.findByIdAndUpdate(id, updateCarDto);
  }

  async remove(id: string) {
    return this.carModel.findByIdAndDelete(id);
  }
}
