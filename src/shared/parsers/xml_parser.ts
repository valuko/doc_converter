import { DocumentType } from '../document_type';
import * as XmlBuilder2 from 'xmlbuilder2';
import {
  XMLSerializedAsObject,
  XMLSerializedAsObjectArray,
} from 'xmlbuilder2/lib/interfaces';
import { BadRequestException } from '@nestjs/common';

export default class XmlParser {
  parserOptions: Record<string, any>;

  constructor(parserOptions: Record<string, any>) {
    this.parserOptions = parserOptions;
  }

  parse(xml: string): DocumentType {
    const doc: DocumentType = {};
    let obj: XMLSerializedAsObject | XMLSerializedAsObjectArray;

    try {
      obj = XmlBuilder2.convert(xml, {
        format: 'object',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new BadRequestException(
        'source xml string is not valid. Please provide a valid xml string',
      );
    }

    const keys = Object.keys(obj['root']);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let xmlVal: Array<Record<string, any>> = obj['root'][key];
      if (!doc[key]) {
        doc[key] = [];
      }
      if (!Array.isArray(xmlVal)) {
        xmlVal = [xmlVal];
      }
      for (let j = 0; j < xmlVal.length; j++) {
        doc[key].push(Object.values(xmlVal[j]));
      }
    }

    return doc;
  }
}
