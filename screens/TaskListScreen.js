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
  state = {selected: (new Map(): Map<string, boolean>)};

  _onPressItem = (id: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <Entity
      value={item.key}
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
      <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>RPLAN My Tasks</Text>
      </View>
        <ScrollView style={styles.container}>

          <View style={styles.listContainer}>

              <EntityList
                data={[
                  {key: 'Devin'},
                  {key: 'Jackson'},
                  {key: 'James'},
                  {key: 'Joel'},
                  {key: 'John'},
                  {key: 'Jillian'},
                  {key: 'Jimmy'},
                  {key: 'Julie'},
                  {key: 'Erick'},
                  {key: 'Fabian'},
                  {key: 'Holger'},
                  {key: 'Leonardo'},
                  {key: 'Matthias'},
                  {key: 'Teodor'},
                  {key: 'Lars'},
                ]}
              />
          </View>
        </ScrollView>

        <View style={styles.detailContainer}>
          <MonoText style={styles.detailText}>Jackson</MonoText>
          <MonoText style={styles.detailText}>is at work</MonoText>
          <MonoText style={styles.detailText}>[Leave work]</MonoText>
        </View>
      </View>
    );
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
    fontSize: 18,
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
