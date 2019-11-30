import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from "../screens/SearchScreen";
import CommitListScreen from "../screens/CommitListScreen";

const RootStack = createStackNavigator(
    {
        Search: SearchScreen,
        Home: HomeScreen,
        CommitList: CommitListScreen
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        initialRouteName: 'Search',
    },
)
const AppContainer = createAppContainer(RootStack)

export default AppContainer

