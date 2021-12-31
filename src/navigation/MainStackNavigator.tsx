import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ScrollView, StatusBar, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {useTheme} from '../utils/hooks';
import NavigationLink from '../components/NavigationLink';
import Title from '../components/Title';
import {HeaderIcon} from '../components/HeaderIcon';

import CircleOverBordersScreen from '../screens/CircleOverBorders/CircleOverBordersScreen';
import TodosScreen from '../screens/Lists/TodosScreen';
import {navigate, navigationRef} from '../navigation/RootNavigation';
import {routes} from '../assets/routes';
import {AddTodoScreen} from '../screens/Lists/AddTodoScreen';
import {EditTodoScreen} from '../screens/Lists/EditTodoScreen';

const RootStack = createStackNavigator();

const Dashboard = () => {
  const {colors} = useTheme();
  const theme = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
  });

  return (
    <ScrollView style={theme.container}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Title text={'Trainings'} size={28} />
      </View>

      {routes.map(s => (
        <NavigationLink
          key={s.key}
          title={s.title}
          route={s.route}
          color={s.color}
        />
      ))}
    </ScrollView>
  );
};

const MainStackScreen = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <RootStack.Group>
          <RootStack.Screen
            name={'Dashboard'}
            component={Dashboard}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name={'CircleOverBorders'}
            component={CircleOverBordersScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={'Todos'}
            component={TodosScreen}
            options={{
              headerRight: () => (
                <HeaderIcon
                  name={'add'}
                  type={'material'}
                  onPress={() => navigate('AddTodo')}
                />
              ),
            }}
          />
        </RootStack.Group>

        <RootStack.Group
          screenOptions={{
            presentation: 'modal',
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forRevealFromBottomAndroid,
          }}>
          <RootStack.Screen
            name={'AddTodo'}
            component={AddTodoScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={'EditTodo'}
            component={EditTodoScreen}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
  },
});

export default MainStackScreen;
