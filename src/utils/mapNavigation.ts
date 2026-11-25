import { Linking, Platform, Alert } from 'react-native';

export interface LocationTarget {
  title: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Opens Google Maps or device native navigation directly targeting the specified location.
 * Prioritizes turn-by-turn two-wheeler navigation mode for delivery partners.
 */
export async function openDirectGoogleMap(
  location: LocationTarget,
  mode: 'two_wheeler' | 'driving' = 'two_wheeler'
): Promise<void> {
  const { address, latitude, longitude, title } = location;

  const encodedAddress = encodeURIComponent(address || title);
  const coords = latitude && longitude ? `${latitude},${longitude}` : null;
  const destination = coords || encodedAddress;

  // 1. Android Native Google Maps Navigation Intent (Two-wheeler / Bike mode)
  const androidNavUri = coords
    ? `google.navigation:q=${coords}&mode=b`
    : `google.navigation:q=${encodedAddress}&mode=b`;

  // 2. Android / Cross-platform Geo Intent
  const geoUri = coords
    ? `geo:${coords}?q=${coords}(${encodeURIComponent(title)})`
    : `geo:0,0?q=${encodedAddress}`;

  // 3. iOS Google Maps scheme
  const iosGoogleMapsUri = coords
    ? `comgooglemaps://?daddr=${coords}&directionsmode=bicycling`
    : `comgooglemaps://?daddr=${encodedAddress}&directionsmode=bicycling`;

  // 4. iOS Apple Maps fallback
  const appleMapsUri = coords
    ? `maps://?daddr=${coords}&dirflg=d`
    : `maps://?daddr=${encodedAddress}&dirflg=d`;

  // 5. Universal Google Maps Web Fallback with two-wheeler travelmode
  const webGoogleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${mode}`;

  try {
    if (Platform.OS === 'android') {
      const canOpenNav = await Linking.canOpenURL(androidNavUri);
      if (canOpenNav) {
        await Linking.openURL(androidNavUri);
        return;
      }

      const canOpenGeo = await Linking.canOpenURL(geoUri);
      if (canOpenGeo) {
        await Linking.openURL(geoUri);
        return;
      }
    } else if (Platform.OS === 'ios') {
      const canOpenGoogle = await Linking.canOpenURL(iosGoogleMapsUri);
      if (canOpenGoogle) {
        await Linking.openURL(iosGoogleMapsUri);
        return;
      }

      const canOpenApple = await Linking.canOpenURL(appleMapsUri);
      if (canOpenApple) {
        await Linking.openURL(appleMapsUri);
        return;
      }
    }

    // Default web URL fallback
    await Linking.openURL(webGoogleMapsUrl);
  } catch (err) {
    console.warn('Could not launch native map app, attempting web map:', err);
    try {
      await Linking.openURL(webGoogleMapsUrl);
    } catch {
      Alert.alert(
        'Map Navigation',
        `Unable to open maps automatically. Destination address:\n${address || title}`
      );
    }
  }
}
