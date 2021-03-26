import diff from 'deep-diff';

/**
 *
 * @param formData the form data to display when not diffing
 * @param showDiff whether or not the diff should be performed
 * @param formIdPrefix
 * @param lhs
 * @param rhs
 * @returns An object with the formData to display, and the idDiffMap, containing the field-level diffs
 */
const useJsonSchemaDiff = (
  formData: any,
  showDiff: boolean,
  formIdPrefix: string,
  lhs?: any,
  rhs?: any
) => {
  if (!showDiff) return {formData};
  const idDiffMap: Record<string, {lhs: any; rhs: any}> = {};
  const differences = diff(lhs, rhs);
  let newFormData = Array.isArray(rhs) ? [...rhs] : {...rhs};

  if (differences) {
    // Populate the diffPathArray and diffArray
    differences.forEach((difference) => {
      if (difference.kind === 'A') {
        // Array differences
        const arrayElementPath = [
          formIdPrefix,
          ...(difference.path ?? []),
          difference.index
        ].join('_');
        if (difference.item.kind === 'N') {
          // Added an element to the array
          Object.keys(difference.item.rhs).forEach((key) => {
            idDiffMap[`${arrayElementPath}_${key}`] = {
              lhs: null,
              rhs: difference.item.rhs[key]
            };
          });
        } else if (difference.item.kind === 'D') {
          const deletedItem = {};
          // Deleted an element from the array
          Object.keys(difference.item.lhs).forEach((key) => {
            deletedItem[key] = null;
            idDiffMap[`${arrayElementPath}_${key}`] = {
              lhs: difference.item.lhs[key],
              rhs: null
            };
          });
          if (Array.isArray(newFormData) && !difference.path) {
            newFormData = [
              ...newFormData.slice(0, difference.index),
              difference.item.lhs,
              ...newFormData.slice(difference.index)
            ];
          }
        }
      } else if (difference.path) {
        const {lhs, rhs} = difference;
        idDiffMap[[formIdPrefix, ...difference.path].join('_')] = {
          lhs: lhs ?? null,
          rhs: rhs ?? null
        };
      }
    });
  }

  return {formData: newFormData, idDiffMap};
};

export default useJsonSchemaDiff;
