import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from './App';

describe('App', function () {
  it('should render anchor link with appropriate text', () => {
    const app = shallow(<App text='Learn React' />);

    expect(app.find('a').text()).toEqual('Learn React');

    app.setProps({ text: 'New text' });

    expect(app.find('a').text()).toEqual('New text');
  });

  it('render the desired output', () => {
    const app = shallow(<App text='Learn React' />);

    expect(toJson(app)).toMatchSnapshot();
  });
});
