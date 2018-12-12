import React from 'react';
import {
  Image,
  Platform,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


class Entity extends React.PureComponent {
  state = {textColor: 'black'};
   _onPress = () => {
    this.setState({textColor: this.props.selected ? "black" : "red"});
  };
  render() {
    return (
      <TouchableHighlight onPress={() => this._onPress()}>
          <View>
            <Text style={[{ color: this.state.textColor }, styles.item]}>{this.props.value}</Text>
          </View>
      </TouchableHighlight>
    );
  }
}

class EntityList extends React.PureComponent {
  state = {selected: new Map()};

  _onPressItem = (id) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <Entity
      value={item.name}
      key={item.key}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        renderItem={this._renderItem}
      />
    );
  }
}

export default class TaskListScreen extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;
    const token = navigation.getParam('token', 'dummy');
    const userName = navigation.getParam('userName', 'dummyName');

    this.setState({
      userName,
      token,
    })

    this._fetchMyTasks(token)
  }

  state = {
    userName: 'dummy',
    token: 'dummy',
    isloading: true,
  }

  render() {
    if (!this.state.isLoading && this.state.tasks) {
      const tasks = this.state.tasks
      const dtoMap = this.state.dtoMap
      return (
        <View style={styles.container} >
          <View style={styles.headerContainer} >
            <Text style={styles.headerText} >RPLAN My Tasks</Text >
          </View >
          <ScrollView style={styles.container} >

            <View style={styles.listContainer} >

              <EntityList
                data={tasks.map(taskId => ({
                  key: taskId,
                  name: dtoMap[taskId].core.name
                }))}
              />
            </View >
          </ScrollView >
        </View >
      );
    } else {
      return null
    }
  }

  _fetchMyTasks(token) {
    return fetch('https://rplan.com/api/v2/dashboard?aspect=core',
      {
        method: 'GET',
        headers: {
          Connection: 'keep-alive',
          Accept: 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        const { dtoMap } = responseJson
        const ids = Object.keys(dtoMap)
        this.setState({ tasks: ids, isLoading: false, dtoMap })
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 50,
    height: 100,
  },
  headerText: {
    fontSize: 24,
    color: '#1976D6',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F9',
  },
  item: {
    padding: 12,
    fontSize: 12,
    height: 42,
    backgroundColor: '#F9F9FF',
    ...Platform.select({
      ios: {
        shadowColor: '#000030',
        shadowOffset: { height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  detailContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#F0F0F9',
    paddingVertical: 30,
  },
  detailText: {
    paddingTop: 20,
  },
});
