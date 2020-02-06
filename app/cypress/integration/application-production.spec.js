describe('The production tab', () => {
  beforeEach(() => {
    cy.sqlFixture('production-draft-form-result-setup');
    cy.login(
      Cypress.env('TEST_REPORTER_USERNAME'),
      Cypress.env('TEST_REPORTER_PASSWORD')
    );
    const applicationId = window.btoa('["applications", 2]');
    const formResultId = window.btoa('["form_results", 15]');
    cy.visit(
      `/reporter/ciip-application?formResultId=${formResultId}&applicationId=${applicationId}&version=1`
    );
  });

  afterEach(() => {
    cy.sqlFixture('production-draft-form-result-teardown');
    cy.logout();
  });

  it('Should render the aluminum product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Aluminum');
    cy.get('.dropdown-item').click();
    cy.get('input:visible[type=text]').should('have.length', 8);
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.get('#root_0_additionalData_anodeReductionAllocationFactor');
    cy.get('#root_0_additionalData_cokeCalcinationAllocationFactor');
    cy.get('#root_0_additionalData_anodeProductionAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the food and cannabis products', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Cannabis');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'hectares');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.get('#root-add').click();
    cy.get('#root_1_productRowId')
      .clear()
      .type('Food');
    cy.get('.dropdown-item').click();
    cy.get('#root_1_productUnits')
      .invoke('val')
      .should('contain', 'hectares');
    cy.get('#root_1_quantity');
    cy.get('#root_1_productionAllocationFactor');
    cy.get('#root_1_importedElectricityAllocationFactor');
    cy.get('#root_1_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Cement product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Cement');
    cy.get('.dropdown-item').click();
    cy.get('input:visible[type=text]').should('have.length', 10);
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.get('#root_0_additionalData_clinkerProduced');
    cy.get('#root_0_additionalData_cementProduced');
    cy.get('#root_0_additionalData_endOfYearClinkerInventory');
    cy.get('#root_0_additionalData_startOfYearClinkerInventory');
    cy.get('#root_0_additionalData_clinkerSales');
    cy.get('#root_0_additionalData_calculatedQuantity');
    cy.percySnapshot();
  });

  it('Should render the Compression products', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Centrifugal Compression');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_additionalData_equipment-add').click();
    cy.get('#root_0_additionalData_equipment_0_id');
    cy.get('#root_0_additionalData_equipment_0_compressorType');
    cy.get('#root_0_additionalData_equipment_0_energySource');
    cy.get('#root_0_additionalData_equipment_0_powerRating');
    cy.get('#root_0_additionalData_equipment_0_loadingFactor');
    cy.get('#root_0_additionalData_equipment_0_runtimeHours');
    cy.get('#root_0_additionalData_equipment_0_consumedEnergy');
    cy.get('#root_0_additionalData_calculatedQuantity');
    cy.get('#root-add').click();
    cy.get('#root_1_productRowId')
      .clear()
      .type('Reciprocating Compression');
    cy.get('.dropdown-item').click();
    cy.get('#root_1_additionalData_equipment-add').click();
    cy.get('#root_1_additionalData_equipment_0_id');
    cy.get('#root_1_additionalData_equipment_0_compressorType');
    cy.get('#root_1_additionalData_equipment_0_energySource');
    cy.get('#root_1_additionalData_equipment_0_powerRating');
    cy.get('#root_1_additionalData_equipment_0_loadingFactor');
    cy.get('#root_1_additionalData_equipment_0_runtimeHours');
    cy.get('#root_1_additionalData_equipment_0_consumedEnergy');
    cy.get('#root_1_additionalData_calculatedQuantity');
    cy.percySnapshot();
  });

  it('Should render the Chemical pulp product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Chemical pulp');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'bone-dry tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Copper (open pit) product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Copper equivalent (open pit)');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Copper Equivalent (underground) product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Copper Equivalent (underground)');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the District energy product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('District energy');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'MWh');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Gold equivalent product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Gold');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Forged steel balls products', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Forged steel balls (grinding media <3.5")');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.get('#root-add').click();
    cy.get('#root_1_productRowId')
      .clear()
      .type('Forged steel balls (grinding media >4")');
    cy.get('.dropdown-item').click();
    cy.get('#root_1_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_1_quantity');
    cy.get('#root_1_productionAllocationFactor');
    cy.get('#root_1_importedElectricityAllocationFactor');
    cy.get('#root_1_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Gypsum wallboard product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Gypsum wallboard');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'square meters');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Lime product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Lime');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_additionalData_lime');
    cy.get('#root_0_additionalData_limeAllocationFactor');
    cy.get('#root_0_additionalData_limeKilnDust');
    cy.get('#root_0_additionalData_limeKilnDustAllocationFactor');
    cy.get('#root_0_additionalData_soldLimestone');
    cy.get('#root_0_additionalData_soldLimestoneAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Hot dip galvanizing and Wire draw products', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Hot dip galvanizing');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.get('#root-add').click();
    cy.get('#root_1_productRowId')
      .clear()
      .type('Wire draw');
    cy.get('.dropdown-item').click();
    cy.get('#root_1_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_1_quantity');
    cy.get('#root_1_productionAllocationFactor');
    cy.get('#root_1_importedElectricityAllocationFactor');
    cy.get('#root_1_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Hydrogen Peroxide product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Hydrogen Peroxide');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Lead-Zinc Smelting product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Lead-Zinc Smelting');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_additionalData_lead');
    cy.get('#root_0_additionalData_zinc');
    cy.get('#root_0_additionalData_leadAllocationFactor');
    cy.get('#root_0_additionalData_zincAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Sweet Gas Plants product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Sweet Gas Plants');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'e3m3OE');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.get('#root_0_additionalData_gasComposition_ch4');
    cy.get('#root_0_additionalData_gasComposition_c2');
    cy.get('#root_0_additionalData_gasComposition_c3');
    cy.get('#root_0_additionalData_gasComposition_h2s');
    cy.get('#root_0_additionalData_gasComposition_co2');
    cy.get('#root_0_additionalData_gasComposition_h2o');
    cy.percySnapshot();
  });

  it('Should render the Sour Gas Plants product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Sour Gas Plants');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'e3m3OE');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.get('#root_0_additionalData_gasComposition_ch4');
    cy.get('#root_0_additionalData_gasComposition_c2');
    cy.get('#root_0_additionalData_gasComposition_c3');
    cy.get('#root_0_additionalData_gasComposition_h2s');
    cy.get('#root_0_additionalData_gasComposition_co2');
    cy.get('#root_0_additionalData_gasComposition_h2o');
    cy.percySnapshot();
  });

  it('Should render the Sugar (liquid) product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Sugar (liquid)');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Sugar (solid) product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Sugar (solid)');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Liquefied Natural Gas product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Liquefied Natural Gas');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Lumber product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Lumber');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'cubic meters');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Coal product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Coal');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Veneer product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Veneer');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'cubic meters');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Wood Panels product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Wood Panels');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'cubic meters');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Other Pulp product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Other Pulp');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'bone-dry tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Silver Equivalent product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Silver Equivalent');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Petroleum Refining product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Petroleum Refining');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'BC refining complexity factor unit');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Wood pellets product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Wood pellets');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Wood chips product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Wood pellets');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });

  it('Should render the Waste rendering product', () => {
    cy.get('#root_0_productRowId')
      .clear()
      .type('Wood pellets');
    cy.get('.dropdown-item').click();
    cy.get('#root_0_productUnits')
      .invoke('val')
      .should('contain', 'tonnes');
    cy.get('#root_0_quantity');
    cy.get('#root_0_productionAllocationFactor');
    cy.get('#root_0_importedElectricityAllocationFactor');
    cy.get('#root_0_importedHeatAllocationFactor');
    cy.percySnapshot();
  });
});
