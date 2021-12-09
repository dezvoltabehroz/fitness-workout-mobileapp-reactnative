import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const data = [
    {
        id: 1,
        title: "New day. New chance. Let nothing stop you from reaching your goals!"
    },
    {
        id: 2,
        title: "Visit our Bodysculpt Mindpower section. Learn about switching out of thoughts into life."
    },
    {
        id: 3,
        title: "Your mind and body are deeply connected, train them both in Bodysculpt."
    },
    {
        id: 4,
        title: "What is your fitness potential? Visit Bodysculpt now!"
    },
    {
        id: 5,
        title: '"The difference between success and failure is just a small switch in your way of thinking" (Dr. Tony Quinn), visit the Mindpower section in Bodysculpt to learn more.'
    },
    {
        id: 6,
        title: "Get your body and mind into shape with Bodysculpt. Log in to see your new workout!"
    },
    {
        id: 7,
        title: "Never forget why you started! Visit Bodysculpt now!"
    },
    {
        id: 8,
        title: "Consistency is the key to success. Visit bodysculpt now!"
    },
    {
        id: 9,
        title: "Love yourself enough to live a healthy lifestyle. Visit the Bodysculpt diet section to see your nutritional plan."
    },
    {
        id: 10,
        title: "Healthy mind. Healthy body. Healthy life. Visit Bodysculpt now."
    },
    {
        id: 11,
        title: "The mind always fails first, not the body.The secret is to make your mind work for you. Visit the Mindpower section in Bodysculpt to learn more."
    },
    {
        id: 12,
        title: "Exercise not only changes your body. It changes your mind, your attitude and your mood. Are you ready to work out?"
    },
    {
        id: 13,
        title: "Take a deep breath and believe in Bodysculpt. We will keep you motivated! "
    },
    {
        id: 14,
        title: "Be stronger than your excuses. Visit Bodysculpt. Your next workout is ready!"
    },
    {
        id: 15,
        title: "Remember that feeling you get after an AMAZING workout? Visit Bodysculpt now!"
    },
    {
        id: 16,
        title: "A little progress each day adds up to BIG results. "
    },
    {
        id: 17,
        title: "Today I will love myself enough to exercise."
    },
    {
        id: 18,
        title: "The body achieves what the mind believes. Visit the Mindpower section in Bodysculpt to find out more."
    },
    {
        id: 19,
        title: "Research conducted by Dr.Tony Quinn show you could improve your goal achieving capacity an average 67% by learning to use more of your mind. Visit Mindpower to find out more."
    },
    {
        id: 20,
        title: "Bodysculpt is based on, possibly the most successful fat-loss study ever conducted. People lost on average 7lbs of fat and gained 3lbs lean muscle in just 12 days. Find out more by visiting the Mindpower section."
    },
    {
        id: 21,
        title: "Could some of what we consider to be normal signs of aging be a combination of nutritional deficiencies and limiting beliefs? Visit your Mindpower and Diet sections now!"
    },
    {
        id: 22,
        title: "After the age of 30, as part of the aging process we lose about half a pound of lean muscle per year. This can lower your metabolism by up to 45%! You can reverse that process by putting the muscle back on! Go to Workouts in Bodysculpt, now!"
    },
    {
        id: 23,
        title: "1 lbs of lean muscle burns on average 50-100 calories per day. If you put on just 3 lbs of muscle you could burn 300 extra calories per day! Go to Workouts now!"
    },
    {
        id: 24,
        title: "Did you know putting on lean muscle can increase your metabolism by up to 45%? Go to your workouts now!"
    },
    {
        id: 25,
        title: "Be the best possible version of yourself! Visit Bodysculpt!"
    },
    {
        id: 26,
        title: "Have you heard of the after-burn effect? Research shows resistance based training or weight training can cause you to burn extra calories for up to 3 days after your workout! It's called the after-burn effect. Visit Workouts now!"
    },
    {
        id: 27,
        title: "Every workout is a step closer to achieving a more confident and capable me."
    },
    {
        id: 28,
        title: "Every workout is a step closer to your goal!"
    },
    {
        id: 29,
        title: "Every day is a new chance to get stronger, eat better, live healthier and to be the best version of you."
    },
    {
        id: 30,
        title: "Today's workout will be tomorrow's warmup. It doesn't get easier, you just get better! Visit Bodysculpt now!"
    }
]


class Notifications {
    constructor() {

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            popInitialNotification: true,
            requestPermissions: true,
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: false,
                sound: false,
            },
        });

        PushNotification.createChannel(
            {
                channelId: 'reminders', // (required)
                channelName: 'Task reminder notifications', // (required)
                channelDescription: 'Reminder for any tasks',
            },
            () => { },
        );

        PushNotification.getScheduledLocalNotifications(rn => {
            console.log('SN --- ', rn);
        });
    }

    schduleNotification(date) {
        PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: '🔔 Reminder!',
            message: this.GFG_Fun(),
            // repeatType:"minute",
            date,
        });
    }
    random = (mn, mx) => {
        return Math.random() * (mx - mn) + mn;
    }

    GFG_Fun = () => {
        console.log(data[Math.floor(this.random(1, 30)) - 1].title);
        return data[Math.floor(this.random(1, 30)) - 1].title;
    }
}




export default new Notifications();