import { DocumentType } from '../document_type';
import XmlSerializer from './xml_serializer';

describe('XmlSerializer', () => {
  describe('serialize()', () => {
    let doc: DocumentType;
    let serializer: XmlSerializer;

    it('returns the serialized string', () => {
      doc = {
        ProductID: [
          ['4', '8', '15'],
          ['a', 'b'],
        ],
        AddressID: [['3', '14']],
        ContactID: [['59', '26']],
      };
      serializer = new XmlSerializer();
      const xmlString = serializer.serialize(doc);

      expect(xmlString).toEqual(`<?xml version="1.0"?>
<root>
  <ProductID>
    <ProductID1>4</ProductID1>
    <ProductID2>8</ProductID2>
    <ProductID3>15</ProductID3>
  </ProductID>
  <ProductID>
    <ProductID1>a</ProductID1>
    <ProductID2>b</ProductID2>
  </ProductID>
  <AddressID>
    <AddressID1>3</AddressID1>
    <AddressID2>14</AddressID2>
  </AddressID>
  <ContactID>
    <ContactID1>59</ContactID1>
    <ContactID2>26</ContactID2>
  </ContactID>
</root>`);
    });
  });
});
