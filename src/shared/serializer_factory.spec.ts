import {
  getSerializer,
  iSerializer,
  SerializerType,
} from './serializer_factory';
import JsonSerializer from './serializers/json_serializer';
import XmlSerializer from './serializers/xml_serializer';
import StringSerializer from './serializers/string_serializer';

describe('getSerializer()', () => {
  let serializerType: SerializerType;
  let serializer: iSerializer;

  describe('when serializerType is json', () => {
    it('returns the JsonSerializer', () => {
      serializerType = 'json';
      expect(getSerializer(serializerType)).toBeInstanceOf(JsonSerializer);
    });
  });

  describe('when serializerType is xml', () => {
    it('returns the XmlSerializer', () => {
      serializerType = 'xml';
      expect(getSerializer(serializerType)).toBeInstanceOf(XmlSerializer);
    });
  });

  describe('when serializerType is string', () => {
    it('returns the StringSerializer', () => {
      serializerType = 'string';
      serializer = getSerializer(serializerType, {
        line_separator: ',',
        value_separator: '\n',
      });
      expect(serializer).toBeInstanceOf(StringSerializer);
    });
  });
});
