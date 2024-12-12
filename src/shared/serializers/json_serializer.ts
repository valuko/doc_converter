import { DocumentType } from '../document_type';
import { documentTypeToJsonDoc } from '../utils';

export default class JsonSerializer {
  serialize(doc: DocumentType): string {
    const jsonDoc: Record<string, any> = documentTypeToJsonDoc(doc);

    return JSON.stringify(jsonDoc);
  }
}
