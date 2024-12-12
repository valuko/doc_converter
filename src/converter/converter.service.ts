import { Injectable } from '@nestjs/common';
import { ConverterDto } from './dto/converter.dto';
import { getParser } from '../shared/parser_factory';
import { getSerializer } from '../shared/serializer_factory';

@Injectable()
export class ConverterService {
  convertData(converterDto: ConverterDto): string | Record<string, any> {
    let sourceStr: string;
    if (converterDto.input.format === 'json') {
      const data = converterDto.input.data;
      sourceStr = JSON.stringify(data);
    } else {
      sourceStr = converterDto.input.source;
    }

    const parser = getParser(
      converterDto.input.format,
      converterDto.input.options,
    );
    const document = parser.parse(sourceStr);
    const serializer = getSerializer(
      converterDto.output.format,
      converterDto.output.options,
    );
    const resultStr = serializer.serialize(document);
    let output: string | Record<string, any>;
    if (converterDto.output.format === 'json') {
      output = JSON.parse(resultStr);
    } else {
      output = resultStr;
    }

    return output;
  }
}
