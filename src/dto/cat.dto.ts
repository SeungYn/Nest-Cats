import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '123123',
    description: 'id',
  })
  id: string;
}
