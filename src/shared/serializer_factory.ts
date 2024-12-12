import JsonSerializer from './serializers/json_serializer';
import XmlSerializer from './serializers/xml_serializer';
import StringSerializer from './serializers/string_serializer';
import { DocumentType } from './document_type';
import { BadRequestException } from '@nestjs/common';
import { StringConverterOptions } from './utils';

export type SerializerType = 'json' | 'xml' | 'string';

export interface iSerializer {
  serialize(doc: DocumentType): string;
}

export const getSerializer = (
  serializerType: SerializerType,
  serializerOptions: Record<string, any> = {},
): iSerializer => {
  switch (serializerType) {
    case 'json':
      return new JsonSerializer();
    case 'xml':
      return new XmlSerializer();
    case 'string':
      const opts = serializerOptions as StringConverterOptions;
      return new StringSerializer(opts);
    default:
      throw new BadRequestException(
        `Unsupported serializer type: ${serializerType}`,
      );
  }
};
