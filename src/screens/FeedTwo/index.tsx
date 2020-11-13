import React from 'react';
import { View, Dimensions, Text, Image, StyleSheet, Animated } from 'react-native';
import { IComments, IFeed } from '../../components/Post/interface';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

import Logo from '../../assets/instagram-darken.svg'
import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen')
const IMAGE_WIDTH = width
const IMAGE_HEIGHT = height

const FeedTwo: React.FC = ({ navigation }) => {

  const [feed, setFeed] = React.useState<IFeed[]>([])
  const [total, setTotal] = React.useState(0)

  const scrollX = React.useRef(new Animated.Value(0)).current

  const loadPage = React.useCallback(async () => {

    const response = await fetch(`http://192.168.0.105:3333/feed`)

    let data = await response.json() as IFeed[]
    const amountItems = Number(response.headers.get('X-Total-Count'))

    setTotal(Math.floor(amountItems / 5))
    setFeed(data)

  }, [total, feed])

  const goToComments = React.useCallback((comments: IComments[]) => {
    navigation.navigate('Comments', { comments })
  }, [])

  React.useEffect(() => {
    loadPage()
  }, [])

  return (
    <View style={{ flex: 1}}>
      <View style={styles.header}>
        <Logo width={110} height={70} />
      </View>
      <Animated.FlatList
        data={feed}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, width, height }}>
              <LinearGradient
                colors={['#000', 'transparent']}
                style={styles.topScrim}
              />
              <Image
                source={{ uri: item.image }}
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.image
                ]}
              />
              <LinearGradient
                colors={['transparent', '#000', '#000']}
                style={styles.scrim}
              />
            </View>
          )
        }}
      />
      {feed.map((item, index) => {
        const inputRange = [(index - 0.5) * width, index * width, (index + 0.5) * width]

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0]
        })

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [20, 0, 20]
        })

        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [50, 0, 50]
        })

        return (
          <View
            key={item.id}
            style={styles.screenWrapper}
          >
            <Animated.View
              style={[
                styles.topWrapper,
                {
                  opacity,
                  transform: [{ translateX }]
                }
              ]}
            >
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </Animated.View>
            <View style={styles.bottomWrapper}>
              <Animated.View
                style={[styles.viewLikes,
                {
                  top: styles.scrim.height / 1.6,
                  opacity,
                  transform: [{ translateY }]
                }
                ]}
              >
                <Text style={styles.likes}>
                  Liked by
              </Text>
                <View style={{ flexDirection: 'row' }}>
                  {item.likes && item.likes.map((url, index) => {
                    return (
                      <Image
                        key={index}
                        source={{ uri: url }}
                        style={[
                          styles.avatarLikes,
                          {
                            zIndex: 10 - index,
                            marginLeft: index === 0 ? 0 : -15
                          }
                        ]}
                      />
                    )
                  })}
                </View>
              </Animated.View>
              <Animated.View
                style={[
                  styles.buttomGoToComments,
                  {
                    top: styles.scrim.height / 1.4,
                    opacity,
                    transform: [{ translateY }]
                  }
                ]}
              >
                <TouchableOpacity
                  style={{ margin: 10 }}
                  onPress={() => goToComments(item.comments)}
                >
                  <MaterialIcons
                    name="chat"
                    color='#FFF'
                    size={26}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        )
      })}
      <SharedElement id={`general.background`}>
        <Animated.View style={styles.dummySharedView} />
      </SharedElement>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    height: 46,
    width,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },
  dummy: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#FFF',
    width: width,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32
  },
  topScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: height * 0.15,
    zIndex: 1,
  },
  scrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    width
  },
  viewLikes: {
    position: 'absolute',
    left: 10,
  },
  likes: {
    fontSize: 16,
    color: '#FFF',
  },
  avatarLikes: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#000'
  },
  screenWrapper: {
    flex: 1,
    position: 'absolute',
    height,
    width
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: '10%',
    width,
    height: height * 0.3
  },
  topWrapper: {
    width,
    height: height * 0.3,
    padding: 15,
    position: 'absolute',
    top: '5%',
  },
  author: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF'
  },
  description: {
    fontSize: 14,
    color: '#FFF'
  },
  buttomGoToComments: {
    position: 'absolute',
    right: '3%',
    alignItems: 'center',
  },
  dummySharedView: {
    position: 'absolute',
    transform: [{ translateY: height}],
    width,
    height,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 50,
    padding: 15
  }
})

export default FeedTwo;