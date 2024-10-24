import { Dimensions, Image, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import * as React from 'react';

import colors from '../styles/colors';

export default function PetCarousel({ petImages }) {
    const width = Dimensions.get('window').width;

    return (
        <Carousel
            style={styles.carousel}
            panGestureHandlerProps={{activeOffsetX: [-10, 10]}}
            pagingEnabled={true}
            loop={false}
            width={width}
            height={width} 
            autoPlay={false}
            data={petImages} 
            scrollAnimationDuration={100}
            renderItem={({ index }) => (
                <Image
                    source={{ uri: petImages[index] }} 
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    carousel: {
        borderWidth: 0.5,
        width: '100%',
        borderRadius: 10,
        marginBottom: 5
    },
    image: {
        alignSelf: 'center',
        width: '100%', 
        height: '100%',
        borderWidth: 0.5,
        borderColor: colors.black,
    },
});