import { describe } from 'node:test';
import XmlParser from './xml_parser';

describe('XmlParser', () => {
  describe('parse()', () => {
    let xmlParser: XmlParser;

    describe('when input xml is valid', () => {
      it('returns the parsed DocumentType', () => {
        const inputStr =
          '<?xml version="1.0" encoding="UTF-8" ?><root><ProductID><ProductID1>4</ProductID1><ProductID2>8</ProductID2><ProductID3>15</ProductID3></ProductID><ProductID><ProductID1>a</ProductID1><ProductID2>b</ProductID2></ProductID><AddressID><AddressID1>3</AddressID1><AddressID2>14</AddressID2></AddressID><ContactID><ContactID1>59</ContactID1><ContactID2>26</ContactID2></ContactID></root>';
        xmlParser = new XmlParser();
        const doc = xmlParser.parse(inputStr);

        expect(JSON.stringify(doc)).toEqual(
          JSON.stringify({
            ProductID: [
              ['4', '8', '15'],
              ['a', 'b'],
            ],
            AddressID: [['3', '14']],
            ContactID: [['59', '26']],
          }),
        );
      });
    });

    describe('when input xml is invalid', () => {
      it('throws an error', () => {
        const inputStr =
          '<?xml version="1.0" encoding="UTF-8" ?><root><ProductID></ProductID1><ProductID2>8</ProductID2><ProductID3>15</ProductID3></ProductID><ProductID><ProductID1>a</ProductID1><ProductID2>b</ProductID2></ProductID><AddressID><AddressID1>3</AddressID1><AddressID2>14</AddressID2></AddressID><ContactID><ContactID1>59</ContactID1><ContactID2>26</ContactID2></ContactID></root>';
        xmlParser = new XmlParser();
        try {
          xmlParser.parse(inputStr);
        } catch (e) {
          expect(e.message).toEqual('XML string is not valid');
        }
      });
    });
  });
});
