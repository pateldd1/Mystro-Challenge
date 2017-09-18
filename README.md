# Mystro Coding Challenge

### Functionality
![demo1](/app/images/demo.gif)

### Logging In
![signin](/app/images/logging_in.gif)

### Signing Up
![signin](/app/images/logging_in.gif)

### Issues with react-native-auth0/react-native-navigation
* Due to a race condition between react-native-auth0 and react-native-navigation that their team is currently working on (https://github.com/auth0/react-native-auth0/issues/83), after logging in or signing up, a user has to press the back button and wait for their home page to load up, as seen in the demo pages above. This is due to error handling and logging in competing to accomplish their subsequent task.
