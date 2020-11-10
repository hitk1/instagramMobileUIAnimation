import React from 'react';
import { Dimensions, StyleSheet, View, Animated, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { IFeed } from '../Post/interface';


interface IProps {
    scrollX: any
    data: IFeed[]
}

const { height, width } = Dimensions.get('screen')

const Scrim: React.FC<IProps> = ({ children, scrollX, data }) => {
    return (
        <LinearGradient
            colors={['transparent', '#000']}
            style={styles.scrim}
        >
            {data.map((item, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

                console.log(scrollX)
                //   const opacity = scrollX.interpolate({
                //       inputRange,
                //       ouputRange: [0, 1, 0]
                //   })

                return (
                    <Animated.View
                        key={index}
                        style={{
                            // opacity
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 28,
                                color: "#FFF"
                            }}
                        >Likes</Text>
                    </Animated.View>
                )
            })}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrim: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height / 5,
        width
    }
})

export default Scrim;