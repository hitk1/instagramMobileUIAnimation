import React from 'react';
import { Dimensions, StyleSheet, Text, View, Animated, Image, FlatList } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { IComments } from '../../components/Post/interface';
import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen')

const Comments: React.FC = ({ route }) => {
  const { comments } = route.params

  return (
    <View style={styles.container}>
      <SharedElement id={'general.background'}>
        <Animated.View style={styles.cardComments}>
          <FlatList
            data={comments}
            keyExtractor={(item: IComments) => String(Math.random())}
            ListHeaderComponent={() => (
              <Animatable.View
                useNativeDriver
                animation={
                  {
                    0: { opacity: 0, translateX: 30 },
                    1: { opacity: 1, translateX: 0 }
                  }
                }
                delay={150}
                style={{ alignSelf: 'center' }}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: '700' }}
                >Your Network</Text>
                <Animatable.View
                  animation={
                    {
                      0: { opacity: 0 },
                      1: { opacity: 1 }
                    }
                  }
                  delay={600}
                  style={styles.dummyLine}
                />
              </Animatable.View>
            )}
            ItemSeparatorComponent={() => (
              <Animatable.View 
              animation={
                {
                  0: { opacity: 0, translateX: 10},
                  1: { opacity: 1, translateX: 0}
                }
              }
              delay={1500}
              style={styles.itemSeparator}
              />
            )}
            renderItem={({ item, index }) => {
              return (
                <Animatable.View
                  useNativeDriver
                  animation={
                    {
                      0: { opacity: 0, translateY: 50 },
                      1: { opacity: 1, translateY: 0 }
                    }
                  }
                  delay={index * 100}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: item.profile }}
                      style={styles.avatar}
                    />
                    <View style={{
                      flex: 1,
                      justifyContent: 'space-between'
                    }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: '7%'
                        }}
                      >
                        <Text style={styles.author}>{item.author}</Text>
                        <Text style={styles.comment}>{item.comment}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: '3%'
                        }}
                      >
                        <Text style={styles.commentTime}>1h</Text>
                        <Text style={styles.likes}>3 likes</Text>
                        <TouchableOpacity 
                        onPress={() => { }}
                        style={{ marginLeft: 10}}
                        >
                          <Text style={styles.reply}>Reply</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animatable.View>
              )
            }}
          />
        </Animated.View>
      </SharedElement>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1E1E',
  },
  cardComments: {
    // position: 'absolute',
    transform: [{ translateY: height * 0.09 }],
    width,
    height,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 50,
    padding: 20,
  },
  dummyLine: {
    height: 3,
    width: 3 * 12,
    backgroundColor: '#1E1D1D99',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: '1%'
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginTop: 20,
  },
  author: {
    fontWeight: '700',
    marginLeft: '3%'
  },
  comment: {
    marginLeft: '2%'
  },
  itemSeparator: {
    height: 1,
    width: width * 0.74,
    alignSelf: 'flex-end',
    marginTop: '2%',
    backgroundColor: '#1E1D1D44'
  },
  commentTime: {
    fontWeight: 'bold',
    color: '#0007'
  },
  likes: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#0009'
  },
  reply: {
    fontWeight: 'bold',
    color: '#0008'
  }
})

Comments.sharedElements = (navigation, otherNavigation, showing) => {
  return [
    {
      id: 'general.background'
    }
  ];
};

export default Comments;