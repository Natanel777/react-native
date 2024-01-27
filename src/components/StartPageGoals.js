import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg'; 

const options = [
    { label: 'Build Muscle', description: 'Short description for Build Muscle' },
    { label: 'Lose Fat', description: 'Short description for Lose Fat' },
    { label: 'Gain Weight/Muscle', description: 'Short description for Gain Weight/Muscle' },
];

export default function StartPageGoals({ navigation }) {
    const avatarImage = require('../../assets/humanBall.png');
    const animatedValue = new Animated.Value(0);

    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        // Configure the animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 2000, // Adjust the duration as needed
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 12], // Adjust the range as needed
    });

    const handleOptionPress = (index) => {
        // Toggle selected state for the pressed option
        setSelectedOptions((prevSelectedOptions) => {
            if (prevSelectedOptions.includes(index)) {
                return prevSelectedOptions.filter((item) => item !== index);
            } else {
                return [...prevSelectedOptions, index];
            }
        });
    };

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#2596be']}
            style={styles.gradientBackground}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginTop: 40 }}
                    >
                        <Path
                            d="M10 19L3 12L10 5M3 12L21 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Animated.Image
                        source={avatarImage}
                        style={[styles.avatar, { transform: [{ translateY }] }]}
                    />
                    <ScrollView style={styles.optionsContainer}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.option,
                                    {
                                        backgroundColor: selectedOptions.includes(index)
                                            ? '#E6F0FF'
                                            : '#ffffff',
                                        borderWidth: 2,  // Add this line to set the border width
                                        borderColor: selectedOptions.includes(index)
                                            ? 'blue'
                                            : '#4c669f',
                                    },
                                ]}
                                onPress={() => handleOptionPress(index)}
                            >
                                <Text style={styles.optionLabel}>{option.label}</Text>
                                <Text style={styles.optionDescription}>{option.description}</Text>
                                <View style={[styles.dot, selectedOptions.includes(index) && styles.blueDot]} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Distribute items along the flex container with space in between
        alignItems: 'center',
        paddingBottom: 20, // Add padding to the bottom to ensure space for the button
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 17.5,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 50,
    },
    header: {
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 125,
        height: 125,
        borderRadius: 50,
        marginBottom: 10,
    },
    optionsContainer: {
        flex: 1, // Fill available space in the container
        marginTop: 20, // Add margin at the top to separate from the image
    },
    option: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        margin: 10,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2596be',
    },
    optionDescription: {
        fontSize: 15,
        color: '#4c669f',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20, // Add margin at the bottom to separate from the safe area
    },
    submitButtonText: {
        fontSize: 17.5,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gradientBackground: {
        flex: 1,
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 5,
        backgroundColor: '#4c669f',
        position: 'absolute',
        right: 10,
        top: '20%', // Center the dot vertically
        transform: [{ translateY: -5 }], // Adjust the vertical position
    },
    blueDot: {
        backgroundColor: 'blue',
    },
});
