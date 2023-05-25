import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CatRequestDto } from 'src/dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    // 몽구스 스키마에서 밸리데이션을 수행해서 에러를 반환해주는데 여기선 그냥 에러처리 또 해줌
    try {
      const result = await this.catModel.exists({ email });
      return !!result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(id: string): Promise<Cat | null> {
    //select 를 사용해서 해당 필드를 뺴고 가져올 수 있음
    const cat = await this.catModel.findById(id).select('-password');

    return cat;
  }
}
