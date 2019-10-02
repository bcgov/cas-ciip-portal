import React from 'react';

it ('renders correctly', () =>{
    const page = renderer
    .create(<Link page = "localhost:3004">welcome</Link>)
    .toJSON();
    expect(page).toMatchSnapshot();
});