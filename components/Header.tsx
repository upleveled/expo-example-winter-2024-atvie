import Constants from 'expo-constants';
import { Image } from 'expo-image';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/constants';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.cardBackground,
    width: '100%',
  },
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    color: colors.text,
    fontFamily: 'Pacifico_400Regular',
    fontSize: 32,
    textAlign: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
});
type Props = {
  label: string;
};

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo.webp')}
          alt="logo"
        />
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}
