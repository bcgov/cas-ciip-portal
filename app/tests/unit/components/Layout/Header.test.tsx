import "../helpers/matchMedia.mock";
import React from "react";
import { mount, shallow } from "enzyme";
import HeaderLayout from "components/Layout/Header";
import { UserProfileDropdownComponent } from "containers/User/UserProfileDropdown";
import { UserProfileDropdown_user } from "__generated__/UserProfileDropdown_user.graphql";

const user = {
  firstName: "Test",
  lastName: "Tester",
  emailAddress: "really-long-email-to-see-wrapping@button.is",
  " $refType": "UserProfileDropdown_user",
};

describe("The Header", () => {
  it("matches the last accepted Snapshot", () => {
    const wrapper = shallow(<HeaderLayout />);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders HeaderLayout when user is not logged-in and not registered", () => {
    const wrapper = shallow(<HeaderLayout />);
    expect(wrapper.contains("Dashboard")).toBe(false);
    expect(wrapper.contains("Logout")).toBe(false);
    expect(wrapper.contains("Program Administrator Login (IDIR)")).toBe(true);
    expect(wrapper.contains("Industrial Operator Login (BCeID)")).toBe(true);
  });

  it("renders HeaderLayout when user is not registered but is logged-in", () => {
    const userProfileWrapper = shallow(
      <UserProfileDropdownComponent user={user as UserProfileDropdown_user} />
    );
    const wrapper = mount(
      <HeaderLayout isLoggedIn userProfileDropdown={userProfileWrapper} />
    );
    expect(wrapper.contains("Dashboard")).toBe(false);
    expect(wrapper.contains("Program Administrator Login (IDIR)")).toBe(false);
    expect(wrapper.contains("Industrial Operator Login (BCeID)")).toBe(false);
    expect(wrapper.contains("Logout")).toBe(true);
  });
  it("renders HeaderLayout when user is registered and logged-in", () => {
    const userProfileWrapper = shallow(
      <UserProfileDropdownComponent user={user as UserProfileDropdown_user} />
    );
    const wrapper = mount(
      <HeaderLayout
        isRegistered
        isLoggedIn
        userProfileDropdown={userProfileWrapper}
      />
    );
    expect(wrapper.find("a.nav-button").first().text()).toBe("Dashboard");
    expect(wrapper.find("button.nav-button").last().text()).toBe("Logout");
    expect(wrapper.find("button[aria-label='User menu toggle']")).toHaveLength(
      1
    );
    expect(wrapper.contains("Program Administrator Login (IDIR)")).toBe(false);
    expect(wrapper.contains("Industrial Operator Login (BCeID)")).toBe(false);
  });
});
