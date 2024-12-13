import { Test, TestingModule } from '@nestjs/testing';
import { ConverterService } from './converter.service';
import { ConverterDto } from './dto/converter.dto';

describe('ConverterService', () => {
  let service: ConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterService],
    }).compile();

    service = module.get<ConverterService>(ConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertData()', () => {
    let converterDto: ConverterDto;

    beforeEach(() => {
      converterDto = new ConverterDto();
    });
    describe('when input format is string', () => {
      beforeEach(() => {
        converterDto.input = {
          format: 'string',
          source:
            'ProductID*4*8*15~ProductID*a*b~AddressID*3*14~ContactID*59*26~',
          options: {
            line_separator: '~',
            value_separator: '*',
          },
        };
      });

      describe('and output format is xml', () => {
        beforeEach(() => {
          converterDto.output = {
            format: 'xml',
          };
        });
        it('converts to the output format', () => {
          const result = service.convertData(converterDto);
          expect(result).toEqual(`<?xml version="1.0"?>
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

      describe('and output format is json', () => {
        beforeEach(() => {
          converterDto.output = {
            format: 'json',
          };
        });

        it('converts to the output format', () => {
          const result = service.convertData(converterDto);
          expect(result).toEqual({
            ProductID: [
              {
                ProductID1: '4',
                ProductID2: '8',
                ProductID3: '15',
              },
              {
                ProductID1: 'a',
                ProductID2: 'b',
              },
            ],
            AddressID: [
              {
                AddressID1: '3',
                AddressID2: '14',
              },
            ],
            ContactID: [
              {
                ContactID1: '59',
                ContactID2: '26',
              },
            ],
          });
        });
      });
    });

    describe('when input format is xml', () => {
      beforeEach(() => {
        converterDto.input = {
          format: 'xml',
          source:
            '<?xml version="1.0" encoding="UTF-8" ?><root><ProductID><ProductID1>4</ProductID1><ProductID2>8</ProductID2><ProductID3>15</ProductID3></ProductID><ProductID><ProductID1>a</ProductID1><ProductID2>b</ProductID2></ProductID><AddressID><AddressID1>3</AddressID1><AddressID2>14</AddressID2></AddressID><ContactID><ContactID1>59</ContactID1><ContactID2>26</ContactID2></ContactID></root>',
        };
      });

      describe('and output format is json', () => {
        beforeEach(() => {
          converterDto.output = {
            format: 'json',
          };
        });

        it('converts to the output format', () => {
          const result = service.convertData(converterDto);
          expect(result).toEqual({
            ProductID: [
              {
                ProductID1: '4',
                ProductID2: '8',
                ProductID3: '15',
              },
              {
                ProductID1: 'a',
                ProductID2: 'b',
              },
            ],
            AddressID: [
              {
                AddressID1: '3',
                AddressID2: '14',
              },
            ],
            ContactID: [
              {
                ContactID1: '59',
                ContactID2: '26',
              },
            ],
          });
        });
      });
    });

    describe('when input format is json', () => {
      beforeEach(() => {
        converterDto.input = {
          format: 'json',
          data: {
            ProductID: [
              {
                ProductID1: '4',
                ProductID2: '8',
                ProductID3: '15',
              },
              {
                ProductID1: 'a',
                ProductID2: 'b',
              },
            ],
            AddressID: [
              {
                AddressID1: '3',
                AddressID2: '14',
              },
            ],
            ContactID: [
              {
                ContactID1: '59',
                ContactID2: '26',
              },
            ],
          },
        };
      });

      describe('and output format is xml', () => {
        beforeEach(() => {
          converterDto.output = {
            format: 'xml',
          };
        });
        it('converts to the output format', () => {
          const result = service.convertData(converterDto);
          expect(result).toEqual(`<?xml version="1.0"?>
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

      describe('and output format is string', () => {
        beforeEach(() => {
          converterDto.output = {
            format: 'string',
            options: {
              line_separator: '~',
              value_separator: '*',
            },
          };
        });

        it('converts to the output format', () => {
          const result = service.convertData(converterDto);
          expect(result).toEqual(
            'ProductID*4*8*15~ProductID*a*b~AddressID*3*14~ContactID*59*26~',
          );
        });
      });
    });
  });
});
