import { DocumentType } from '../document_type';
import * as XmlBuilder2 from 'xmlbuilder2';
import { documentTypeToJsonDoc } from '../utils';

export default class XmlSerializer {
  serializerOptions: Record<string, any>;
  constructor(serializerOptions: Record<string, any>) {
    this.serializerOptions = serializerOptions;
  }

  serialize(doc: DocumentType): string {
    const jsonDoc: Record<string, any> = documentTypeToJsonDoc(doc);

    const obj = {
      root: jsonDoc,
    };
    const xmlDoc = XmlBuilder2.create(obj);
    const xmlStr = xmlDoc.end({ prettyPrint: true });

    return xmlStr;
  }
}
