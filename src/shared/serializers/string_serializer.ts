import { DocumentType } from '../document_type';

export default class StringSerializer {
  serializerOptions: Record<string, any>;
  lineSeparator: string;
  valueSeparator: string;

  constructor(serializerOptions: Record<string, any>) {
    this.serializerOptions = serializerOptions;
    this.lineSeparator = serializerOptions['line_separator'] as string;
    this.valueSeparator = serializerOptions['value_separator'] as string;
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
