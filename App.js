import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { RadioBrowserApi } from 'radio-browser-api';
import { Audio } from 'expo-av';
export default function App() {
  const [stationList, setStationList] = useState({});
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = React.useState();
  const rbApi = new RadioBrowserApi("ORadio");
  async function playSound() {
    try {
      const listOf = await rbApi.searchStations({
        countryCode: 'US',
        limit: 5,
      });
      setStationList(listOf);
      // Audio.setAudioModeAsync({
      //   allowsRecordingIOS: false,
      //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      //   shouldDuckAndroid: true,
      //   staysActiveInBackground: true,
      //   staysActiveInBackground: true,
      //   playThroughEarpieceAndroid: true
      // });
    
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(

        require(stationList[0].urlResolved)

      );

      console.log('Playing Sound');
      await sound.playAsync(); 

    } catch(error) {
      console.log("Promise Rejected");
    } 
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);



  return (
    <View style={styles.container}>
      <Text>Hello There</Text>
      {stationList[0] && stationList[0] != null ? 
        // <ReactPlayer playing={playing} url={stationList[0].urlResolved} /> 
        <Text>This SHould Work</Text>
      : 
        <Text>loading..</Text>
      }
      <Button
        onPress= {() => {setUpStations();setPlaying(!playing);}}
        title="Play/Pause"
      />
      <StatusBar style="auto" />
    </View>
  );
}
// test
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
