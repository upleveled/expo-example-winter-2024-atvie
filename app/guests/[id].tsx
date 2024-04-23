import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontSize: 20,
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
});

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const API_URL = 'https://fjh676-4000.csb.app';

export default function Guests() {
  const { id } = useLocalSearchParams();

  const [guest, setGuest] = useState<Guest>();

  const imageContext = require.context('../../assets', false, /\.(avif)$/);

  useEffect(() => {
    async function loadGuest() {
      try {
        if (typeof id !== 'string') {
          return;
        }
        const response = await fetch(`${API_URL}/guests/${id}`);
        const fetchedGuest = await response.json();
        setGuest(fetchedGuest);
      } catch (error) {
        console.error('Error fetching guest', error);
      }
    }
    loadGuest().catch(console.error);
  }, [id]);

  if (!guest) {
    return null;
  }

  if (typeof id !== 'string') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {guest.firstName} {guest.lastName}
      </Text>
      <Text style={styles.text}>
        {guest.attending ? 'Attending' : 'Not attending'}
      </Text>
      <Image
        style={styles.profilePicture}
        source={imageContext(`./guest-${id}.avif`)}
        alt="profile picture"
      />
      <Image
        style={styles.profilePicture}
        source={{
          uri: `https://res.cloudinary.com/trueque-image/image/upload/v1713269496/guest-${id}.webp`,
        }}
        alt="profile picture"
      />
    </View>
  );
}
