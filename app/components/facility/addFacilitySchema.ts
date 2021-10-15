import { JSONSchema7 } from "json-schema";

const addFacilitySchema: JSONSchema7 = {
  type: "object",
  properties: {
    facilityName: {
      title: "Facility Name",
      type: "string",
    },
    facilityType: {
      type: "string",
      title: "Facility Type",
      enum: ["IF_a", "IF_b", "L_c", "SFO"],
    },
    bcghgid: {
      type: "string",
      title: "BCGHG ID Number",
    },
    organisationRowId: {
      title: "Parent Operator",
      type: "integer",
    },
  },
  required: ["facilityName", "facilityType", "bcghgid", "organisationRowId"],
};

export default addFacilitySchema;
