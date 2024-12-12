import {
  IsIn,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ParserType } from '../../shared/parser_factory';
import { SerializerType } from '../../shared/serializer_factory';
import { Type } from 'class-transformer';

class StringConverterOptionsDto {
  @IsString()
  @IsNotEmpty()
  readonly line_separator: string;

  @IsString()
  @IsNotEmpty()
  readonly value_separator: string;
}

class ConverterInputDto {
  @IsNotEmpty()
  @IsIn(['json', 'xml', 'string'])
  readonly format: ParserType;

  @IsObject()
  @ValidateIf((o) => o.format === 'json')
  readonly data?: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.format !== 'json')
  readonly source?: string;

  @IsNotEmpty()
  @ValidateNested()
  @ValidateIf((o) => o.format === 'string')
  @Type(() => StringConverterOptionsDto)
  readonly options?: StringConverterOptionsDto | Record<string, any>;
}

class ConverterOutputDto {
  @IsNotEmpty()
  @IsIn(['json', 'xml', 'string'])
  readonly format: SerializerType;

  @IsNotEmpty()
  @ValidateNested()
  @ValidateIf((o) => o.format === 'string')
  @Type(() => StringConverterOptionsDto)
  readonly options?: StringConverterOptionsDto | Record<string, any>;
}

export class ConverterDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ConverterInputDto)
  readonly input: ConverterInputDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ConverterOutputDto)
  readonly output: ConverterOutputDto;
}
