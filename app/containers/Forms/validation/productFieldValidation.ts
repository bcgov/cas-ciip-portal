const productFieldValidation: (formData: any, errors: any) => any = (
  formData,
  errors
) => {
  let hasFalseRequiresEmissionAllocation = false;
  let hasRequirePurchasedElectricity = false;
  let hasRequirePurchasedHeat = false;
  let hasRequireExportedElectricity = false;
  let hasRequireExportedHeat = false;
  let hasRequireGeneratedElectricity = false;
  let hasRequireGeneratedHeat = false;
  let hasRequireEmissionsFromEios = false;
  let nonEnergyProductCount = 0;
  const energyProductsReported = [];
  const productsInConflict = [];

  if (formData[0]?.productRowId) {
    formData.forEach((product, index: number) => {
      if (product.requiresEmissionAllocation === false)
        hasFalseRequiresEmissionAllocation = true;
      if (product.isEnergyProduct === false) {
        nonEnergyProductCount++;
        productsInConflict.push(index + 1);
      } else {
        energyProductsReported.push(product.productRowId);
      }

      if (product.addPurchasedElectricityEmissions === true)
        hasRequirePurchasedElectricity = true;
      if (product.addPurchasedHeatEmissions === true)
        hasRequirePurchasedHeat = true;
      if (product.subtractExportedElectricityEmissions === true)
        hasRequireExportedElectricity = true;
      if (product.subtractExportedHeatEmissions === true)
        hasRequireExportedHeat = true;
      if (product.subtractGeneratedElectricityEmissions === true)
        hasRequireGeneratedElectricity = true;
      if (product.subtractGeneratedHeatEmissions === true)
        hasRequireGeneratedHeat = true;
      if (product.addEmissionsFromEios === true)
        hasRequireEmissionsFromEios = true;
    });
  }

  if (hasFalseRequiresEmissionAllocation && nonEnergyProductCount > 1)
    errors['0'].addError(
      `Products: ${productsInConflict.join(
        ','
      )} cannot be reported together as at least one of these products does not require manual allocation of emissions.`
    );

  if (hasRequirePurchasedElectricity && !energyProductsReported.includes(3))
    errors['0'].addError(
      'Purchased Electricity is a required product based on the products you have reported, please refer to the guidance document'
    );

  if (hasRequirePurchasedHeat && !energyProductsReported.includes(4))
    errors['0'].addError(
      'Purchased Heat is a required product based on the products you have reported, please refer to the guidance document'
    );

  if (hasRequireExportedElectricity && !energyProductsReported.includes(1))
    errors['0'].addError(
      'Sold Electricity is a required product based on the products you have reported, please refer to the guidance document'
    );

  if (hasRequireExportedHeat && !energyProductsReported.includes(2))
    errors['0'].addError(
      'Sold Heat is a required product based on the products you have reported, please refer to the guidance document'
    );

  if (hasRequireGeneratedElectricity && !energyProductsReported.includes(5))
    errors['0'].addError(
      'Generated Electricity is a required product based on the products you have reported, please refer to the guidance document'
    );

  if (hasRequireGeneratedHeat && !energyProductsReported.includes(6))
    errors['0'].addError(
      'Generated Heat is a required product based on the products you have reported, please refer to the guidance document'
    );

  if (hasRequireEmissionsFromEios && !energyProductsReported.includes(7))
    errors['0'].addError(
      'Emissions from EIOs is a required product based on the products you have reported, please refer to the guidance document'
    );

  return errors;
};

export default productFieldValidation;
