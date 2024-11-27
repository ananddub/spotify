import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../utils/NavigationUtil';
import SplashScreen from '../features/auth/SplashScreen';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MoodScanner from '../features/moodscan/MoodScanner';
import SharedTransition from '../features/tabs/SharedTransition';
const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="SplashScreen"
                screenOptions={{
                    headerShown: false,
                    animation: 'fade'
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="MoodeScanner" component={MoodScanner} />
                <Stack.Screen name="UserBottomTab" component={SharedTransition} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
