import * as React from 'react';

export interface IHelloWorldProps {

}

export interface IHelloWorldState {
  
}

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  render() {
    return (
      <div>Hello World</div>
    );
  }
};
