import { getParser, ParserType } from './parser_factory';
import JsonParser from './parsers/json_parser';
import XmlParser from './parsers/xml_parser';
import StringParser from './parsers/string_parser';
import { StringConverterOptions } from './utils';

describe('getParser()', () => {
  let parserType: ParserType;

  describe('when parserType is json', () => {
    it('returns a JsonParser', () => {
      parserType = 'json';
      expect(getParser(parserType)).toBeInstanceOf(JsonParser);
    });
  });

  describe('when parserType is xml', () => {
    it('returns a XmlParser', () => {
      parserType = 'xml';
      expect(getParser(parserType)).toBeInstanceOf(XmlParser);
    });
  });

  describe('when parserType is string', () => {
    it('returns a StringParser', () => {
      parserType = 'string';
      const parserOptions: StringConverterOptions = {
        line_separator: '\n',
        value_separator: '*',
      };
      expect(getParser(parserType, parserOptions)).toBeInstanceOf(StringParser);
    });
  });
});
