import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';

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
            <Text style={errorMessage} >
              {this.state.errorMessage}
            </Text>
          ) : null
        }
        <Text style={styles.title}>
          LOGIN
        </Text>

        <View style={styles.inputRow}>
          <View style={styles.inputIconPlaceholder}>
            <Image
              style={{ width: 25, height: 20, marginTop: 10, marginLeft: 7 }}
              source={require('../assets/images/mail.png')}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(userName) => this.setState({ userName })}
              value={this.state.userName}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputIconPlaceholder}>
            <Image
              style={{ width: 20, height: 25, marginTop: 7, marginLeft: 9 }}
              source={require('../assets/images/padlock.png')}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry
            />
          </View>
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
          if (!this.state.token) {
            throw new Error('invalid login');
          }
        })
        .then(() => navigate('TaskList', { userName: this.state.name, token: this.state.token })
        )
        .catch((err) => this._showError(err.message))
    }
  }

  _showError = (message) => {
    this.setState({ errorMessage: message });
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
        console.log('response:', responseJson)
        if (responseJson && responseJson.access_token) {
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
  title: {
    color: '#444444',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 30,
  },
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
    backgroundColor: 'white',
    flex: 1,
  },
  textInput: {
    height: 40,
    fontSize: 20,
    paddingLeft: 10,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputIconPlaceholder: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    marginRight: 10,
  }
});