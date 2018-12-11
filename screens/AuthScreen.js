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
    token: '',
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
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="user name"
            onChangeText={(userName) => this.setState({ userName })}
            value={this.state.userName}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry
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

    if (userName && password) {
      this._fetchToken(userName, password)
        .then(() => {
          if(!this.state.token) {
            throw new Error('invalid login');
          }
        })
        .then(() => navigate('TaskList', { userName: this.state.name, token: this.state.token })
        )
        .catch((err) => this._showError(err.message))
    }
  }

  _showError = (message) => {
    this.setState({ errorMessage: message});
    setTimeout(() => this.setState({ errorMessage: null }), 4500);
  };

  _fetchToken(username, password) {
    return fetch('http://localhost:8081/api/auth/token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'password',
          username,
          password,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response:' ,responseJson)
        if(responseJson && responseJson.access_token) {
          const token = responseJson.access_token;
          this.setState({ token });
        } else {
          this.setState({ name: '', password: '' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
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
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  textInput: {
    height: 40,
    padding: 0,
    fontSize: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
