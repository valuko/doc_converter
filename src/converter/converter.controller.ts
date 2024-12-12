import { Body, Controller, Post, Response, ValidationPipe } from '@nestjs/common';
import { Response as Res } from 'express';
import { ConverterDto } from './dto/converter.dto';
import { ConverterService } from './converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly service: ConverterService) {}
  @Post()
  async create(
    @Body(new ValidationPipe()) converterDto: ConverterDto,
    @Response() res: Res,
  ) {
    const result = this.service.convertData(converterDto);
    if (converterDto.output.format === 'xml') {
      return res.setHeader('Content-Type', 'text/xml').send(result);
    }
    if (converterDto.output.format === 'json') {
      return res.setHeader('Content-Type', 'application/json').send(result);
    }
    return res.setHeader('Content-Type', 'text/plain').send(result);
  }
}
