import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class TaskListScreen extends React.Component {
  componentDidMount() {
    console.log('taskList:', this.props)
    const { navigation } = this.props;
    const token = navigation.getParam('token', 'dummy');
    const userName = navigation.getParam('userName', 'dummyName');

    this.setState({
      userName,
      token,
    })
  }

  state = {
    userName: 'dummy',
    token: 'dummy',
  }

  render() {


    return (
      <ScrollView style={styles.container}>
        <Text> {`Token: ${this.state.token}`} </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#fff',
  },
});
