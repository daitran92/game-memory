import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Layer, Box } from 'grommet';

@observer class Container extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-body">
        {this.props.children}
      </div>
    );
  }
}

Container.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Container;
