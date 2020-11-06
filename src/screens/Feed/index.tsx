import React from 'react';
import { FlatList, View, Dimensions, Text, Image, StyleSheet, Animated } from 'react-native';
import { Directions, FlingGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IFeed } from '../../components/Post/interface';

// import { Container } from './styles';

const { width, height } = Dimensions.get('screen')

const IMAGE_WIDTH = width * 0.86
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5
const VISIBLE_ITEMS = 4

const Feed: React.FC = () => {

  const [feed, setFeed] = React.useState<IFeed[]>([])
  const [page, setPage] = React.useState(1)
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const [activeIndex, setActiveIndex] = React.useState(0)

  const animatedIndex = React.useRef(new Animated.Value(0)).current
  const reactiveAnimated = React.useRef(new Animated.Value(0)).current


  const loadPage = React.useCallback(async (pageNumber: number = page, shouldRefresh?: boolean) => {

    if (total && pageNumber > total) return

    setLoading(true)
    const response = await fetch(`http://192.168.0.105:3333/feed?_expand=author&_limit=5&_page=${pageNumber}`)

    let data = await response.json() as any[]
    const amountItems = Number(response.headers.get('X-Total-Count'))

    setTotal(Math.floor(amountItems / 5))
    setFeed(shouldRefresh ? data : [...feed, ...data])
    setPage(pageNumber + 1)
    setLoading(false)

  }, [page, total, loading, feed])

  const setActiveSlide = React.useCallback(newIndex => {
    setActiveIndex(newIndex)
    reactiveAnimated.setValue(newIndex)
  }, [activeIndex, reactiveAnimated])

  React.useEffect(() => {
    loadPage(1, true)

    Animated.timing(animatedIndex, {
      toValue: reactiveAnimated,
      duration: 200,
      useNativeDriver: true
    }).start()
  }, [])

  return (
    <FlingGestureHandler
      key="LEFT"
      direction={Directions.LEFT}
      onHandlerStateChange={event => {
        if (event.nativeEvent.state === State.END) {
          if (activeIndex === feed.length - 1)
            return

          setActiveSlide(activeIndex + 1)
        }

      }}
    >
      <FlingGestureHandler
        key="RIGHT"
        direction={Directions.RIGHT}
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.END) {
            if (activeIndex === 0)
              return

            setActiveSlide(activeIndex - 1)
          }
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#1D1E1E'
          }}
        >
          <FlatList
            data={feed}
            keyExtractor={(post: IFeed) => String(post.id)}
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            CellRendererComponent={({ index, item, children, style, ...restProps }) => {
              const newStyle = [
                style,
                {
                  zIndex: feed.length - index,
                  left: -IMAGE_WIDTH / 2,
                  top: -IMAGE_HEIGHT / 2
                }
              ]              
              return (
                <View index={index} {...restProps} style={newStyle}>
                  {children}
                </View>
              )
            }}
            renderItem={({ item, index }) => {

              const inputRange = [index - 1, index, index + 1]
              const translateX = animatedIndex.interpolate({
                inputRange,
                outputRange: [25, 0, -25]
              })
              const opacity = animatedIndex.interpolate({
                inputRange,
                outputRange: [0.1, 1, 0]
              })
              const scale = animatedIndex.interpolate({
                inputRange,
                outputRange: [0.95, 1, 1.2]
              })

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    opacity,
                    transform: [{ translateX }, { scale }],
                  }}
                >
                  <TouchableOpacity
                    onPress={() => { }}
                  >
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={{ position: 'absolute', left: 20, bottom: 20 }}>
                      <Text style={{ fontSize: 48, color: '#FFF' }} >{index}</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              )
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
    borderRadius: 16
  }
})

export default Feed;