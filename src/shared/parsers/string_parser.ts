import { DocumentType } from '../document_type';
import { BadRequestException } from '@nestjs/common';
import { StringConverterOptions } from '../utils';

export default class StringParser {
  lineSeparator: string;
  valueSeparator: string;

  constructor(parserOptions: StringConverterOptions) {
    this.lineSeparator = parserOptions.line_separator;
    this.valueSeparator = parserOptions.value_separator;
  }

  parse(input: string): DocumentType {
    if (!this.lineSeparator) {
      throw new BadRequestException('Line separator is required');
    }
    if (!this.valueSeparator) {
      throw new BadRequestException('Value separator is required');
    }

    const doc: DocumentType = {};
    const lines = input.split(this.lineSeparator);
    for (let i = 0; i < lines.length; i++) {
      const lineParts = lines[i].split(this.valueSeparator);
      const key = lineParts[0];
      if (!key.trim()) {
        continue;
      }

      const values = lineParts.slice(1);
      if (!doc[key]) {
        doc[key] = [];
      }
      doc[key].push(values);
    }

    return doc;
  }
}
