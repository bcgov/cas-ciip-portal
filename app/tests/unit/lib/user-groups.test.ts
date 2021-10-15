import {
  getAllGroups,
  compactGroups,
  getPriorityGroup,
  getUserGroupLandingRoute,
} from "lib/user-groups";

describe("User Groups", () => {
  describe("getAllGroups", () => {
    it("should return all groups", () => {
      const GROUPS = [
        "Guest",
        "User",
        "Realm Administrator",
        "Incentive Administrator",
        "Incentive Analyst",
        "Pending Analyst",
      ];

      expect(getAllGroups()).toStrictEqual(GROUPS);
    });
  });

  describe("compactGroups", () => {
    it("should return empty when all groups invalid", () => {
      const userGroups = ["fake 1", "fake 2"];
      const groups = compactGroups(userGroups);

      expect(groups).toStrictEqual([]);
    });

    it("should return only valid groups", () => {
      const userGroups = ["fake 1", "Pending Analyst", "fake 3"];
      const groups = compactGroups(userGroups);

      expect(groups).toStrictEqual(["Pending Analyst"]);
    });
  });

  describe("getPriorityGroup", () => {
    it("should default to group Guest", () => {
      const userGroups = [];
      const groupName = getPriorityGroup(userGroups);

      expect(groupName).toBe("Guest");
    });

    it("should return the valid group name", () => {
      const userGroups = ["Incentive Administrator", "fake 1"];
      const groupName = getPriorityGroup(userGroups);

      expect(groupName).toBe("Incentive Administrator");
    });

    it("should get the group name with min priority number", () => {
      const userGroups = ["Incentive Administrator", "Incentive Analyst"];
      const groupName = getPriorityGroup(userGroups);

      expect(groupName).toBe("Incentive Administrator");
    });
  });

  describe("getUserGroupLandingRoute", () => {
    it("should get the default landing route", () => {
      const userGroups = [];
      const groupPath = getUserGroupLandingRoute(userGroups);

      expect(groupPath).toBe("/");
    });

    it("should get the correct landing route", () => {
      const userGroups = ["Incentive Administrator", "Incentive Analyst"];
      const groupPath = getUserGroupLandingRoute(userGroups);

      expect(groupPath).toBe("/admin");
    });
  });
});
