import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

export default class AuthScreen extends React.Component {
  static navigationOptions = {
    title: 'Auth',
  };

  state = {
    name: '',
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <View style={{ padding: 10 }}>
          <TextInput
            style={{
              height: 40,
              fontSize: 20,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            placeholder="user name"
            onChangeText={(name) => this.setState({ name })}
          />
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (this.state.name) {
              navigate('TaskList', { userName: this.state.name });
            }
          }}
        >
          <View
            style={styles.submitDisc}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  submitDisc: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: 'blue',
  },
});
