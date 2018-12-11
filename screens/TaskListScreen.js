import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class TaskListScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text> Place the task list here </Text>
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
