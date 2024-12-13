import JsonParser from './parsers/json_parser';
import XmlParser from './parsers/xml_parser';
import StringParser from './parsers/string_parser';
import { DocumentType } from './document_type';
import { BadRequestException } from '@nestjs/common';
import { StringConverterOptions } from './utils';

export type ParserType = 'json' | 'xml' | 'string';

export interface iParser {
  parse(inputStr: string): DocumentType;
}

export const getParser = (
  parserType: ParserType,
  parserOptions: Record<string, any> = {},
): iParser => {
  switch (parserType) {
    case 'json':
      return new JsonParser();
    case 'xml':
      return new XmlParser();
    case 'string':
      const opts = parserOptions as StringConverterOptions;
      return new StringParser(opts);
    default:
      throw new BadRequestException(`Unsupported parser type: ${parserType}`);
  }
};
