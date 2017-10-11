import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router';
// import configureStore from 'redux-mock-store';
import { Index } from '../../components/views/Index.jsx';
import Footer from '../../components/views/partials/Footer.jsx';
import AuthNav from '../../components/views/partials/AuthNav.jsx';
import SigninForm from '../../components/views/partials/SignInForm.jsx';

// const mockStore = configureStore();

describe('<Index/>', () => {
  const wrapper = shallow(<Index />);
  it('renders a the component successfully', () => {
    const wrapper = shallow(
      <StaticRouter>
        <Index />
      </StaticRouter>
    );
    wrapper.instance();
  });
  it('renders a <Footer/> component', () => {
    expect(wrapper.find(Footer).length).toEqual(1);
  });
  it('renders a <SignInForm /> component', () => {
    expect(wrapper.find(SigninForm).length).toEqual(1);
  });
  it('renders a <AuthNav /> component', () => {
    expect(wrapper.find(AuthNav).length).toEqual(1);
  });
});
