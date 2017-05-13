import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Box } from 'grommet';

import MainGameContainer from 'containers/MainGameContainer';
import './index.module.scss';

@observer class MainPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Box className="main-page" align="center" justify="center">
        <MainGameContainer />
      </Box>
    );
  }
}

MainPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default MainPage;
