import React from 'react';
import LandingIndustryUser from '../../pages/landingIndustryUser';
import { render, fireEvent, cleanup } from '@testing-library/react';

describe('landingIndustryUser', () => {
    afterEach(cleanup);
    it('It matches the last accepted Snapshot', () => {
        const wrapper = mount(<LandingIndustryUser />);
        expect(wrapper).toMatchSnapshot();
    });

});
