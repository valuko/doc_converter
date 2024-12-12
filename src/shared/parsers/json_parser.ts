import { DocumentType } from '../document_type';
import { BadRequestException } from '@nestjs/common';

export default class JsonParser {
  parse(inputStr: string): DocumentType {
    let json: Record<string, any>;
    try {
      json = JSON.parse(inputStr);
      if (JSON.stringify(json) !== inputStr) {
        throw new Error();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new BadRequestException('Invalid JSON data');
    }

    const doc: DocumentType = {};

    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const jsonVal: Array<Record<string, string>> = json[key];
      if (!doc[key]) {
        doc[key] = [];
      }
      const values = jsonVal.map((v) => Object.values(v));
      for (let j = 0; j < values.length; j++) {
        doc[key].push(values[j]);
      }
    }

    return doc;
  }
}
