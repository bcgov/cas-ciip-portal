import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const OrganisationListContainer = props => {

    const {query} = props;

    if (query.allOrganisations) {

        const organisations = [...query.allOrganisations.edges];
        const dropDownItems = [];

        for (const org of organisations) {
            dropDownItems.push(
                <Dropdown.Item>{org.node.operatorName}</Dropdown.Item>
            );
        }

        return (
            <DropdownButton title="Select Organization...">
                {dropDownItems}
            </DropdownButton>
        );
    }

    return <>Loading</>;
}

export default createFragmentContainer(OrganisationListContainer, {
    query: graphql`
        fragment OrganisationListContainer_query on Query {
            allOrganisations {
                edges {
                    node {
                        id
                        operatorName
                    }
                } 
            }
        }
    `
});