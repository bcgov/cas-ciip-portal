import jsonSchemaDiff from 'lib/jsonSchemaDiff';

describe('The jsonSchemaDiff function', () => {
  const prefix = 'myPrefix';

  describe('when receiving two objects', () => {
    it('should not return differences objects are identical', () => {
      const lhs = {
        a: 1,
        b: 'foo',
        c: {
          d: 'bar'
        }
      };
      const rhs = {
        a: 1,
        b: 'foo',
        c: {
          d: 'bar'
        }
      };
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({});
    });
    it('should return differences when a value is changed', () => {
      const lhs = {
        a: 1,
        b: 'foo',
        c: {
          d: 'bar'
        }
      };
      const rhs = {
        a: 42,
        b: 'foo',
        c: {
          d: 'baz'
        }
      };
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({
        [`${prefix}_a`]: {lhs: 1, rhs: 42},
        [`${prefix}_c_d`]: {lhs: 'bar', rhs: 'baz'}
      });
    });

    it('should return field-level differences when a nested object is added', () => {
      const lhs = {};
      const rhs = {
        a: {
          b: 'foo'
        }
      };
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({
        [`${prefix}_a_b`]: {lhs: null, rhs: 'foo'}
      });
    });

    it('should return differences when a value is added', () => {
      const lhs = {
        a: 1,
        c: {
          d: 'bar'
        }
      };
      const rhs = {
        a: 1,
        b: 'foo',
        c: {
          d: 'bar',
          e: 42
        }
      };
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({
        [`${prefix}_b`]: {lhs: null, rhs: 'foo'},
        [`${prefix}_c_e`]: {lhs: null, rhs: 42}
      });
    });

    it('should return differences when a value is removed', () => {
      const lhs = {
        a: 1,
        b: 'foo',
        c: {
          d: 'bar',
          e: 'baz'
        }
      };
      const rhs = {
        b: 'foo',
        c: {
          d: 'bar'
        }
      };
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({
        [`${prefix}_a`]: {lhs: 1, rhs: null},
        [`${prefix}_c_e`]: {lhs: 'baz', rhs: null}
      });
    });
  });

  describe('when receiving two arrays of objects', () => {
    it('should return no differences when the arrays are identical', () => {
      const lhs = [{a: 1}, {b: 'foo'}, {c: 'bar'}];
      const rhs = [{a: 1}, {b: 'foo'}, {c: 'bar'}];
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({});
    });

    it('should return differences when an object in the array is modified', () => {
      const lhs = [{a: 1}, {b: 'foo'}, {c: 'bar'}];
      const rhs = [{a: 42}, {b: 'foo'}, {c: 'baz'}];
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({
        [`${prefix}_0_a`]: {lhs: 1, rhs: 42},
        [`${prefix}_2_c`]: {lhs: 'bar', rhs: 'baz'}
      });
    });
    it('should return differences when an object is added to the array', () => {
      const lhs = [{a: 1}];
      const rhs = [{a: 1}, {b: 'foo'}, {c: 'baz'}];
      const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
      expect(result.formData).toStrictEqual(rhs);
      expect(result.idDiffMap).toStrictEqual({
        [`${prefix}_1_b`]: {lhs: null, rhs: 'foo'},
        [`${prefix}_2_c`]: {lhs: null, rhs: 'baz'}
      });
    });
    describe('when an object is removed from the array', () => {
      it('should return differences', () => {
        const lhs = [{a: 1}, {b: 'foo'}, {c: 'bar'}];
        const rhs = [{a: 1}];
        const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
        expect(result.idDiffMap).toStrictEqual({
          [`${prefix}_1_b`]: {lhs: 'foo', rhs: null},
          [`${prefix}_2_c`]: {lhs: 'bar', rhs: null}
        });
      });
      it('should return an amended formData with the elements that were deleted', () => {
        const lhs = [{a: 1}, {b: 'foo'}, {c: 'bar'}];
        const rhs = [{a: 42}];
        const result = jsonSchemaDiff(rhs, prefix, lhs, rhs);
        expect(result.formData).toStrictEqual([...rhs, {b: 'foo'}, {c: 'bar'}]);
      });
    });
  });
});
