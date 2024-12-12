import StringParser from './string_parser';

describe('StringParser', () => {
  describe('parse()', () => {
    const inputStr =
      'ProductID*4*8*15~ProductID*a*b~AddressID*3*14~ContactID*59*26~';
    let stringParser: StringParser;

    describe('when line separator is empty', () => {
      it('throws an error', () => {
        stringParser = new StringParser({
          value_separator: '*',
          line_separator: '',
        });
        try {
          stringParser.parse(inputStr);
        } catch (e) {
          expect(e.message).toEqual('Line separator is required');
        }
      });
    });

    describe('when value Separator is empty', () => {
      it('throws an error', () => {
        stringParser = new StringParser({
          line_separator: '~',
          value_separator: '',
        });
        try {
          stringParser.parse(inputStr);
        } catch (e) {
          expect(e.message).toEqual('Value separator is required');
        }
      });
    });

    describe('when all data are valid', () => {
      it('returns the parsed DocumentType', () => {
        stringParser = new StringParser({
          line_separator: '~',
          value_separator: '*',
        });
        const doc = stringParser.parse(inputStr);
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
  });
});
