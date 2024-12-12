import JsonParser from './parsers/json_parser';
import XmlParser from './parsers/xml_parser';
import StringParser from './parsers/string_parser';
import { DocumentType } from './document_type';
import { BadRequestException } from '@nestjs/common';

export type ParserType = 'json' | 'xml' | 'string';

export interface iParser {
  parserOptions: Record<string, any>;
  parse(inputStr: string): DocumentType;
}

export const getParser = (
  parserType: ParserType,
  parserOptions: Record<string, any>,
): iParser => {
  switch (parserType) {
    case 'json':
      return new JsonParser(parserOptions);
    case 'xml':
      return new XmlParser(parserOptions);
    case 'string':
      return new StringParser(parserOptions);
    default:
      throw new BadRequestException(`Unsupported parser type: ${parserType}`);
  }
};
