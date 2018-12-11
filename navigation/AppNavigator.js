import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Auth from './../screens/AuthScreen';
import TaskList from './../screens/TaskListScreen';

export default createSwitchNavigator({
  TaskList,
  Auth,
  },
  {
    initialRouteName: 'Auth',
  }
);