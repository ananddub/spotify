
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

const Stack = createNativeStackNavigator();
function NavigationTest() {
    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName='slide1'
                screenOptions={{
                    animation: 'flip'
                }}
            >
                <Stack.Screen name="slide1" component={Slide1} />
                <Stack.Screen name="slide2" component={Slide2} />
                <Stack.Screen name="slide3" component={Slide3} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationTest;

