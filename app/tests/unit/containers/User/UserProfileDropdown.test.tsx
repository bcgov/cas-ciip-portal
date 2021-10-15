import React from "react";
import { shallow, mount } from "enzyme";
import { Dropdown } from "react-bootstrap";
import { UserProfileDropdownComponent } from "containers/User/UserProfileDropdown";
import { UserProfileDropdown_user } from "__generated__/UserProfileDropdown_user.graphql";

const user = {
  firstName: "Test",
  lastName: "Tester",
  emailAddress: "really-long-email-to-see-wrapping@button.is",
  " $refType": "UserProfileDropdown_user",
};

describe("UserProfileDropdown desktop", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(
      <UserProfileDropdownComponent user={user as UserProfileDropdown_user} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("opens a user menu", () => {
    const wrapper = mount(
      <UserProfileDropdownComponent user={user as UserProfileDropdown_user} />
    );

    wrapper.find(Dropdown.Toggle).simulate("click");
    wrapper.update();

    const menuText = wrapper.find(".dropdown-menu.show").text();
    expect(menuText.includes("Test Tester")).toBe(true);
    expect(
      menuText.includes("really-long-email-to-see-wrapping@button.is")
    ).toBe(true);
    wrapper.unmount();
  });
});
