# CasperHolders Mobile

# How to build

## Pre-requisites

[Expo installation documentation](https://docs.expo.dev/get-started/installation/)

- Node LTS release
- Git
- Watchman (see the installation documentation )
- [Android](https://docs.expo.dev/workflow/android-studio-emulator/)
  / [iOs simulator](https://docs.expo.dev/workflow/ios-simulator/)
- Expo / eas cli

```bash
yarn global add expo-cli eas-cli
```

## Local dev

# First build or modifications to the native files

```bash
yarn install
yarn android
```

# Next builds

```bash
yarn start
```

Make sure to have the android opened before using the `yarn android` command.  
The expo dev client might crash on the first opening of the application.  
Just open the application drawer and re-open the application.  
This bug isn't present in the production build.

## Local tests

### !! Important !!

In order to run correctly the tests locally create a file name .env.local with the following
content :

```
TEST_LOCAL_SIGNER_KEY="<TestnetPrivateKeyWithoutPem>"
```

The first env variable will enable you to test all users interactions (Transfer / Stake / Unstake)

If the application is slow / stuck on the simulator that's because of a bug from an HTTP interceptor
lib.  
This bug isn't present in the production build. To remediate this you can add this env variable to
disable the source event listener :

```
APP_DISABLE_EVENT_SOURCES=true
```

### Run tests

```bash
yarn test
```


