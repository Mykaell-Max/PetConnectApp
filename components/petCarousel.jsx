import * as React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function PetCarousel({ petImages }) {
    const width = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
                pagingEnabled={true}
                loop={false}
                width={width}
                height={width} 
                autoPlay={false}
                data={petImages} 
                scrollAnimationDuration={100}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <Image
                        source={{ uri: petImages[index] }} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%', 
        height: '100%', 
    },
});