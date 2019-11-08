import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { AppState, AsyncStorage, Platform } from 'react-native';
import { appStrings } from '../themes';
import { asyncStorage } from '../utils';

const TAG = appStrings.myFCMMsg;
export default class MyFirebaseMessageing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            appState: AppState.currentState
        }
    }
    componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();

    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }
    async getToken() {

        let fcmToken = await asyncStorage.getFcmToken();
        console.log(TAG, "getToken out side fcmToken", fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log(TAG, "getToken inside fcmToken", fcmToken);
            if (fcmToken) {
                // user has a device token
                asyncStorage.setFcmToken(fcmToken)
            }
        }


      /*   let fcmToken = await firebase.messaging().getToken();
        console.log(TAG, "fcmToken", fcmToken);
        asyncStorage.setFcmToken(fcmToken) */
    }
    async createNotificationListeners() {
        const channel = new firebase.notifications.Android.Channel('channelId', 'Channel Name', firebase.notifications.Android.Importance.Max).setDescription('A natural description of the channel');
        firebase.notifications().android.createChannel(channel);



        //A message will trigger the onMessage listener when the application receives a message in the foreground.
        this.messageListener = firebase.messaging().onMessage((message) => {
            // Process your message as required
            console.log(TAG, "onMessage.." + message)
        });
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notificationDisplay) => {
            console.log(TAG, "onNotificationDisplayed..")
            console.log(TAG, "notificationDisplay" + notificationDisplay);

        });


        // the listener returns a function you can use to unsubscribe
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            console.log(TAG, "onNotification..")
            let data = notification._data;
            console.log(TAG, "data.." + JSON.stringify(data))
            console.log(notification);
            if (Platform.OS === 'android') {

                const localNotification = new firebase.notifications.Notification({ sound: 'default', how_in_foreground: true, })
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .android.setChannelId('channelId') // e.g. the id you chose above
                    .android.setSmallIcon('appicone') // create this icon in Android Studio
                    .android.setColor(colors.header) // you can set a color here
                    .android.setPriority(firebase.notifications.Android.Priority.High)
                    .android.setAutoCancel(true);

                firebase.notifications().displayNotification(localNotification).catch(err => console.error(err));
                firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
            } else if (Platform.OS === 'ios') {
                console.log(TAG, "BUDGE :" + notification.ios.badge);
                const localNotification = new firebase.notifications.Notification({ sound: 'default', how_in_foreground: true, })
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .ios.setBadge(notification.ios.badge);

                firebase.notifications().displayNotification(localNotification).catch(err => console.error(TAG, "err:" + err));
                firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
            }
        });


        //If your app is in the foreground, or background, you can listen for when a notification is clicked / tapped / opened as follows:
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get the action triggered by the notification being opened
            console.log(TAG, "onNotificationOpened..")
            console.log(notificationOpen)
            const NotiData = notificationOpen.notification._data;
            //navidate here


        });


        // If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            console.log(TAG, "getInitialNotification..")
        }


    }
  
    render() {
        return null;
    }
    componentWillUnmount() {

        this.messageListener();
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();

    }

}