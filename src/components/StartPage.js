// AnimatedAvatar.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Localization from 'expo-localization';
import { useNavigation } from '@react-navigation/native';

const translations = {
  en: {
    hello: "Hi, I'm Joe",
    subtitle: "I'm here to help you to get in shape",
    start: "Let's Get Started!"
  },
  he: {
    hello: "היי, אני ג'ו",
    subtitle: "אני כאן כדי לעזור לך להתמקד בכושר",
    start: "בוא נתחיל"
  }
};

export default function StartPage() {
  const avatarImage = require('../../assets/humanBall.png');
  const navigation = useNavigation();
  const [locale, setLocale] = useState(getLocale());
  const t = translations[locale];

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    setLocale(getLocale());

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

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#2596be']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.Image
            source={avatarImage}
            style={[styles.avatar, { transform: [{ translateY }] }]}
          />
          <Text style={[styles.boldtext, styles.hello]}>
            {t.hello}
          </Text>
          <Text style={styles.subtitle}>
            {t.subtitle}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('StartPageGoals')}>
            <Text style={styles.buttonText}>{t.start}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const getLocale = () => {
  const locales = Localization.getLocales();
  return locales && locales.length > 0 ? locales[0].languageCode : 'en';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  boldtext: {
    fontWeight: 'bold',
    color: 'white',
  },
  hello: {
    fontSize: 30,
    marginBottom: 5,
    color: 'white',
  },
  subtitle: {
    fontSize: 17.5,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 17.5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  gradientBackground: {
    flex: 1,
  },
});
