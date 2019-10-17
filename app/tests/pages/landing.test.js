import React from 'react';
import Landing from '../../pages/landing';
import { mount } from 'enzyme';
import { render, fireEvent, cleanup } from '@testing-library/react';



describe('landing', () => {
    afterEach(cleanup);
    it('It matches the last accepted Snapshot', () => {
        const wrapper = mount(<Landing />);
        expect(wrapper).toMatchSnapshot();
    });

    it('get BCEID button should bring up modal', () => {
        const { getByTestId } = render(<Landing />);
        fireEvent.click(getByTestId('get-modal'));
        expect(getByTestId('modal')).toBeDefined();
        expect(getByTestId('btn-get-portal')).toBeDefined();
    });
    it('continue button should collapse modal and bring up bceid site', () => {
        const { getByTestId } = render(<Landing />);
        fireEvent.click(getByTestId('get-modal'));
        fireEvent.click(getByTestId('btn-get-portal'));
        expect({ getByTestId }).not.toContain('modal');
        expect(document.querySelector('.btn-portal').getAttribute("href")).toBe("https://www.bceid.ca/");
    });
});