import JsonSerializer from './serializers/json_serializer';
import XmlSerializer from './serializers/xml_serializer';
import StringSerializer from './serializers/string_serializer';
import { DocumentType } from './document_type';
import { BadRequestException } from '@nestjs/common';

export type SerializerType = 'json' | 'xml' | 'string';

export interface iSerializer {
  serializerOptions: Record<string, any>;
  serialize(doc: DocumentType): string;
}

export const getSerializer = (
  serializerType: SerializerType,
  serializerOptions: Record<string, any> = {},
): iSerializer => {
  switch (serializerType) {
    case 'json':
      return new JsonSerializer(serializerOptions);
    case 'xml':
      return new XmlSerializer(serializerOptions);
    case 'string':
      return new StringSerializer(serializerOptions);
    default:
      throw new BadRequestException(`Unsupported serializer type: ${serializerType}`);
  }
};
