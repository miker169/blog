import React, { useContext, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Context } from '../context/BlogContext';


const Index = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);
  return (
    <View>
      { !!state.length && (
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
            <View style={styles.row}>
              <Text style={styles.title}>
                {item.title}
                {' '}
                -
                {' '}
                {item.id}
              </Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Feather
                  style={styles.icon}
                  name="trash"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      )}
    </View>
  );
};

Index.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Create');
    }}
    >
      <Feather name="plus" size={30} />
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }

});

export default Index;
