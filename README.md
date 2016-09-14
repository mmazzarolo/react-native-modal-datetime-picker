<img src="https://freeiconshop.com/files/edd/calendar-flat.png" width="100" align="left">
# react-native-modal-datetime-picker
A react-native datetime-picker that works on both Android and iOS.
<br/>
<br/>

This library works only on Android.
On iOS you should use  [react-native-ibeacon](https://www.npmjs.com/package/react-native-ibeacon) (I tried to name the events/method like it).

<br/>

## Setup
The library is available on npm, install it with: `npm install --save react-native-modal-datetime-picker`.  

## Usage

<br/>

## Eddystone support
Do you have a spare Eddystone beacon and a bit of knowledge of Java?
Well, you're the perfect candidate for helping with the issue [#22](https://github.com/mmazzarolo/react-native-beacons-android/issues/22)!

<br/>

## A simple example
The following example will start detecting all the close iBeacons.
```javascript
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-android'

// Tells the library to detect iBeacons
Beacons.detectIBeacons()

// Start detecting all iBeacons in the nearby
try {
  await Beacons.startRangingBeaconsInRegion('REGION1')
  console.log(`Beacons ranging started succesfully!`)
} catch (err) {
  console.log(`Beacons ranging not started, error: ${error}`)
}

// Print a log of the detected iBeacons (1 per second)
DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
  console.log('Found beacons!', data.beacons)
})
```

<br/>

## Example project
You can find an example project using `react-native-ibeacon` + `react-native-beacons-android` [here] (https://github.com/MacKentoch/reactNativeBeaconExample) (thanks to [MacKentoch](https://github.com/MacKentoch)).

<br/>

## Usage on Android 6 (Marshmallow)
Detecting beacons on Android 6 requires [runtime permission](https://github.com/mmazzarolo/react-native-beacons-android/issues/15).  
Thanks to [@alessandro-bottamedi](https://github.com/alessandro-bottamedi) and [@micheletedeschi](https://github.com/micheletedeschi) for investigating on it.

<br/>

## Usage details
**1. Import the library**
```javascript
import Beacons from 'react-native-beacons-android'
```

**2. Detect a custom beacon layout (optional)**
A beacon layout is a string (for example: `m:0-3=4c000215,i:4-19,i:20-21,i:22-23,p:24-24`) that tells the library what kind of beacons you want to detect (iBeacons, altBeacons, etc...).
By default the library can detect only [AltBeacons](http://altbeacon.org/) but you can add any kind of beacon layout you want (you can find the layout of your beacons on Google).
You can detect a custom beacon layout with:
```javascript
Beacons.detectCustomBeaconLayout('m:0-3=4c000215,i:4-19,i:20-21,i:22-23,p:24-24') // iBeacons layout
```
For sake of simplicity I also added an utility method that you can use for detecting iBeacons:
```javascript
Beacons.detectIBeacons()
```
**3. Start ranging/monitoring for beacons**
You can use this library for both region monitoring and region ranging.
If you don't know the difference between monitoring and ranging you can find some informations [here](https://community.estimote.com/hc/en-us/articles/203356607-What-are-region-Monitoring-and-Ranging-).
```javascript
// Ranging
try {
  await Beacons.startRangingBeaconsInRegion('REGION1', '2ba8e073-b782-3957-0947-268e3850lopd')
  console.log(`Beacons ranging started successfully`)
} catch (err) {
  console.log(`Beacons ranging not started, error: ${error}`)
}

// Monitoring
try {
  await Beacons.startMonitoringForRegion('REGION1', '2ba8e073-b782-3957-0947-268e3850lopd')
  console.log(`Beacons monitoring started successfully`)
} catch (err) {
  console.log(`Beacons monitoring not started, error: ${error}`)
}
```
The parameter `REGION1` that I'm using is an identifier for the scanned region (use whatever you like).
The parameter `2ba8e073-b782-3957-0947-268e3850lopd` is optional, and is used for limiting the detected beacons to the beacons with that specific UUID (if the parameter is omitted the library will detect any beacons).

P.S.: You can stop ranging/monitoring by calling `Beacons.stopRangingBeaconsInRegion()` and `Beacons.stopMonitoringForRegion()`

**4. Do something when the beacons are detected!**
After the ranging/monitoring starts you can get the information of the detected region and beacons using React-Native `DeviceEventEmitter`.
Ranging will emit a `beaconsDidRange` event, while monitoring will emit a `regionDidEnter`/`regionDidExit` event.
```javascript
import { DeviceEventEmitter } from 'react-native'

DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
  console.log('Found beacons!', data) // Result of ranging
})
DeviceEventEmitter.addListener('regionDidEnter', (region) => {
  console.log('Entered new beacons region!', region) // Result of monitoring
})
DeviceEventEmitter.addListener('regionDidExit', (region) => {
  console.log('Exited beacons region!', region) // Result of monitoring
})
```
<br/>

## API docs
##### Beacons.detectCustomBeaconLayout(parser: string): void
Allows the detection of a custom beacon layout.
For example `Beacons.detectCustomBeaconLayout('m:0-3=4c000215,i:4-19,i:20-21,i:22-23,p:24-24')` allows you to detect iBeacons beacons.
<br />
<br />

##### Beacons.detectIBeacons(): void
Allows the detection of iBeacons.
It's just like calling `detectCustomBeaconLayout` with the iBeacons layout.
<br />
<br />

##### Beacons.detectEstimotes(): void
Allows the detection of Estimote beacons.
It's just like calling `detectCustomBeaconLayout` with the Estimote layout.
<br />
<br />

##### Beacons.checkTransmissionSupported(): promise
Checks if the device can use the Bluetooth to detect the beacons.
```javascript
try {
  const transmissionSupport = await Beacons.checkTransmissionSupported()
  console.log(`TransmissionSupport status: ${transmissionSupport}`)
} catch (error) {
  console.log(`TransmissionSupport error: ${error}`)
}
```
<br />

##### Beacons.setForegroundScanPeriod(period: number): void
Sets the duration in milliseconds of each Bluetooth LE scan cycle to look for beacons (in foreground).
For more info [take a look at the official docs](https://altbeacon.github.io/android-beacon-library/javadoc/index.html)
<br />
<br />

##### Beacons.setBackgroundScanPeriod(period: number): void
Sets the duration in milliseconds of each Bluetooth LE scan cycle to look for beacons (in background).
For more info [take a look at the official docs](https://altbeacon.github.io/android-beacon-library/javadoc/index.html)
<br />
<br />

##### Beacons.setBackgroundBetweenScanPeriod(period: number): void
Sets the duration in milliseconds spent not scanning between each Bluetooth LE scan cycle when no ranging/monitoring clients are in the foreground.
For more info [take a look at the official docs](https://altbeacon.github.io/android-beacon-library/javadoc/index.html)
<br />
<br />

##### Beacons.getRangedRegions(): promise
Returns a promise that resolves in an array with the regions being ranged.  
```javascript
try {
  const rangedRegions = await Beacons.getRangedRegions()
  console.log(`${rangedRegions.length} regions are being ranged`)
} catch (error) {
  console.log(`getRangedRegions error: ${error}`)
}
```
<br />

##### Beacons.getMonitoredRegions(): promise
Returns a promise that resolves in an array with the regions being monitored.  
```javascript
try {
  const monitoredRegions = await Beacons.getMonitoredRegions()
  console.log(`${monitoredRegions.length} regions are being monitored`)
} catch (error) {
  console.log(`getMonitoredRegions error: ${error}`)
}
```
<br />

##### Beacons.startMonitoringForRegion(regionId: string, beaconsUUID: string): promise
Starts monitoring for beacons.
The parameter `regionId` must be an unique ID.
The parameter `beaconsUUID` is optional, it allows you to detect only the beacons with a specific UUID (if `null` every beacon will be detected).
```javascript
try {
  await Beacons.startMonitoringForRegion('REGION1', '2ba8e073-b782-3957-0947-268e3850lopd')
  console.log(`Beacons monitoring started successfully`)
} catch (error) {
  console.log(`Beacons monitoring not started, error: ${error}`)
}
```
<br />

##### Beacons.startRangingBeaconsInRegion(regionId: string, beaconsUUID: string): promise
Starts range scan for beacons.
The parameter `regionId` must be an unique ID.
The parameter `beaconsUUID` is optional, it allows you to detect only the beacons with a specific UUID (if `null` every beacon will be detected).
```javascript
try {
  await Beacons.startRangingBeaconsInRegion('REGION1', '2ba8e073-b782-3957-0947-268e3850lopd')
  console.log(`Beacons ranging started successfully`)
} catch (error) {
  console.log(`Beacons ranging not started, error: ${error}`)
}
```
<br />

##### Beacons.stopMonitoringForRegion(regionId: string, beaconsUUID: string): promise
Stops the monitoring for beacons.
```javascript
try {
  await Beacons.stopMonitoringForRegion('REGION1', '2ba8e073-b782-3957-0947-268e3850lopd')
  console.log(`Beacons monitoring stopped successfully`)
} catch (error) {
  console.log(`Beacons monitoring stopped with an error: ${error}`)
}
```
<br />

##### Beacons.stopRangingBeaconsInRegion(regionId: string, beaconsUUID: string): promise
Stops the range scan for beacons.
```javascript
try {
  await Beacons.stopRangingBeaconsInRegion('REGION1', '2ba8e073-b782-3957-0947-268e3850lopd')
  console.log(`Beacons ranging stopped successfully`)
} catch (error) {
  console.log(`Beacons ranging stopped with an error: ${error}`)
}
```
<br/>
