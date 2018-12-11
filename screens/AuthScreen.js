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
              .catch(() => _showError())
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
    return reject('Invalid User')
  });

  _showError = () => console.log('Should be implemented');
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
