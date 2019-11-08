import firebase from 'react-native-firebase';
// Optional flow type
import { RemoteMessage } from 'react-native-firebase';
const TAG = "bgMessaging";
export default async (message: RemoteMessage) => {
    // handle your message
    if (message.getNotification() != null) {
        console.log(TAG, "Message Notification Body: " + message.getNotification().getBody());
    }

    return Promise.resolve();
}