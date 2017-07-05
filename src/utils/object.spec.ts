import {ObjectUtils} from './object';

describe('utils', () => {
  describe('pick', () => {

    it('should return only the requested attributes', () => {
      let object = {
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      };

      let newObject = ObjectUtils.pick(object, ['attr1', 'attr2']);

      expect(newObject).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2'
      });

      expect(object).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      });
    });

    it('should ignore missing keys', () => {
      let object = {
        attr1: 'attribute_1',
        attr3: 'attribute_3'
      };

      let newObject = ObjectUtils.pick(object, ['attr1', 'attr2']);

      expect(newObject).toEqual({
        attr1: 'attribute_1'
      });

      expect(object).toEqual({
        attr1: 'attribute_1',
        attr3: 'attribute_3'
      });
    });
  });

  describe('extend', () => {
    it('should merge objects attributes', () => {
      let object1 = {
        attr1: 'attribute_1',
        attr2: 'attribute_2'
      };

      let object2 = {
        attr3: 'attribute_3'
      };

      let newObject = ObjectUtils.extend(object1, object2);

      let expected = {
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      };
      expect(newObject).toEqual(expected);

      expect(object1).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2'
      });

      expect(object2).toEqual({
        attr3: 'attribute_3'
      });
    });

    it('shold merge objects attributes and override the first object ones', () => {
      let object1 = {
        attr1: 'attribute_1',
        attr2: 'attribute_2'
      };

      let object2 = {
        attr2: 'attribute_2_2',
        attr3: 'attribute_3'
      };

      let newObject = ObjectUtils.extend(object1, object2);

      let expected = {
        attr1: 'attribute_1',
        attr2: 'attribute_2_2',
        attr3: 'attribute_3'
      };
      expect(newObject).toEqual(expected);

      expect(object1).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2'
      });

      expect(object2).toEqual({
        attr2: 'attribute_2_2',
        attr3: 'attribute_3'
      });
    });
  });

  describe('merge', () => {
    it('should merge without pick', function () {
      let object1 = {
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      };

      let object2 = {
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      };

      let newObject = ObjectUtils.merge(object1).with(object2);

      expect(newObject).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3',
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      });

      expect(object1).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      });

      expect(object2).toEqual({
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      });
    });

    it('should merge picking attributes of the base object', () => {
      let object1 = {
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      };

      let object2 = {
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      };

      let newObject = ObjectUtils.merge(object1, ['attr1', 'attr2']).with(object2);

      expect(newObject).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      });

      expect(object1).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      });

      expect(object2).toEqual({
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      });
    });

    it('should merge picking attributes of the second object', () => {
      let object1 = {
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      };

      let object2 = {
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      };

      let newObject = ObjectUtils.merge(object1).with(object2, ['attrA', 'attrC']);

      expect(newObject).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3',
        attrA: 'attribute_A',
        attrC: 'attribute_C'
      });

      expect(object1).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      });

      expect(object2).toEqual({
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      });
    });

    it('should merge picking attributes of both objects', () => {
      let object1 = {
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      };

      let object2 = {
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      };

      let newObject = ObjectUtils
        .merge(object1, ['attr2', 'attr3'])
        .with(object2, ['attrA', 'attrC']);

      expect(newObject).toEqual({
        attr2: 'attribute_2',
        attr3: 'attribute_3',
        attrA: 'attribute_A',
        attrC: 'attribute_C'
      });

      expect(object1).toEqual({
        attr1: 'attribute_1',
        attr2: 'attribute_2',
        attr3: 'attribute_3'
      });

      expect(object2).toEqual({
        attrA: 'attribute_A',
        attrB: 'attribute_B',
        attrC: 'attribute_C'
      });
    });
  });
});
