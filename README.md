# CasperHolders Mobile

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholders-mobile&metric=coverage)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholders-mobile)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholders-mobile&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholders-mobile)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholders-mobile&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholders-mobile)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholders-mobile&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholders-mobile)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholders-mobile&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholders-mobile)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=casperholders_casperholders-mobile&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=casperholders_casperholders-mobile)

The native mobile wallet for the Casper Network.

Use your Ledger device to transfer or manage your staking operations on mobile !

Features :

- Testnet / Mainnet network support

- Ledger device support (Bluetooth)

- Balance & staking overview

- Transfer funds

- Stake / unstake funds

- History

Android : https://play.google.com/store/apps/details?id=com.casperholders.wallet  
iOS : https://apps.apple.com/us/app/casper-holders/id1609981086

# User demo

https://www.youtube.com/watch?v=EPzYFJrPqzM

# How to build

## Pre-requisites

[Expo installation documentation](https://docs.expo.dev/get-started/installation/)

- Node LTS release
- Git
- Watchman (see the installation documentation )
- Java SDK 11
- [Android](https://docs.expo.dev/workflow/android-studio-emulator/)
  / [iOs simulator](https://docs.expo.dev/workflow/ios-simulator/)
- Expo / eas cli

```bash
yarn global add expo-cli eas-cli
```

## Local dev

# First build or modifications to the native files

Casper Holders is created with expo and use the managed workflow. However we use some native
libraries so you can't use the expo go app and you must compile the application for Android or iOS (
require a Mac).

For android

```bash
yarn install
expo prebuild -p android
yarn android
```

For iOS

```bash
yarn install
expo prebuild -p ios
yarn ios
```

# Next builds

```bash
yarn start
```

Make sure to have the android simulator opened before using the `yarn android` command.  
The expo dev client might crash on the first opening of the application.  
Just open the application drawer and re-open the application.  
This bug isn't present in the production build.

## Local tests

### !! Important !!

In order to run correctly the tests locally create a file name .env.local with the following
content :

```bash
TEST_LOCAL_SIGNER_KEY="<TestnetPrivateKeyWithoutPem>"
```

This env variable will enable you to test all users interactions (Transfer / Stake / Unstake)
without ledger and will add a button "Connect with test key" on the login screen.

If the application is slow / stuck on the simulator that's because of a bug from an HTTP interceptor
lib.

This bug isn't present in the production build or on real devices.

To remediate this you can add this env variable to disable the source event listener :

```bash
APP_DISABLE_EVENT_SOURCES=true
```

### Run tests

```bash
yarn install
yarn test
```


