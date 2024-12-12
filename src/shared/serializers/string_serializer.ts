import { DocumentType } from '../document_type';
import { StringConverterOptions } from '../utils';

export default class StringSerializer {
  lineSeparator: string;
  valueSeparator: string;

  constructor(serializerOptions: StringConverterOptions) {
    this.lineSeparator = serializerOptions.line_separator;
    this.valueSeparator = serializerOptions.value_separator;
  }

  serialize(doc: DocumentType): string {
    let serialStr = '';

    const keys = Object.keys(doc);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const values = doc[key];
      const valueKeys = Object.keys(values);
      for (let j = 0; j < valueKeys.length; j++) {
        const rowValues = values[j];
        const rowStr = [key, ...rowValues].join(this.valueSeparator);
        serialStr += `${rowStr}${this.lineSeparator}`;
      }
    }

    return serialStr;
  }
}
