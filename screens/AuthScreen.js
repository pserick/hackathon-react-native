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
          style={styles.button}
          onPress={this._onPress}
        >
          <Text style={{ color: 'white' }}> login </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _onPress = () => {
    const { navigate } = this.props.navigation;
    const { userName, password } = this.state;

    this._login({ name: userName, password })
      .then(() => navigate('TaskList'))
      .catch((err) => this._showError(err.message))
  }

  _login = (user) => new Promise((resolve, reject) => {
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
    padding: 60,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1a76d6',
    padding: 10,
  },
});
