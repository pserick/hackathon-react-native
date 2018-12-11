import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default class AuthScreen extends React.Component {
  static navigationOptions = {
    title: 'Auth',
  };

  state = {
    errorMessage: '',
    userName: '',
    password: '',
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        {
          this.state.errorMessage ? (
            <Text style={{ color: 'red', fontSize: 30 }} >
              { this.state.errorMessage }
            </Text>
          ) : null
        }
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
            onChangeText={(userName) => this.setState({ userName })}
          />
        </View>

        <View style={{ padding: 10 }}>
          <TextInput
            style={{
              height: 40,
              fontSize: 20,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            placeholder="password"
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            const { userName, password } =  this.state;

            this._login({ name: userName, password})
              .then(() => navigate('TaskList'))
              .catch((err) => this._showError(err.message))
          }}
        >
          <View
            style={styles.submitDisc}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _login = (user) => new Promise((resolve, reject) => {
    console.log(user);
    if (user.name === 'admin' && user.password === 'admin') {
      return resolve()
    }
    return reject(Error('Invalid User'))
  });

  _showError = (message) => {
    this.setState({ errorMessage: message});
    setTimeout(() => this.setState({ errorMessage: null }), 4500);
  };
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
