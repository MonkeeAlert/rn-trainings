import {Dimensions} from 'react-native';
import {ITodoColor} from './types';

// Theme colors
export const colors = {
  white: '#fff',
  black: '#141414',
  grey: '#e0e0e0',
  lightGrey: '#f3f3f3',
  darkGrey: '#aeaeae',
  infoMain: '#0288d1',
  infoLight: '#03a9f4',
  infoDark: '#01579b',
  successMain: '#2e7d32',
  successLight: '#4caf50',
  successDark: '#1b5e20',
  error: '#b00020',
  completed: '#aed581',
};

export const borders = Dimensions.get('screen').width - 100;
export const defaultBorderRadius = 6;

// Placeholers for todos
export const defaultTodoPlaceholders = [
  'Wash the dishes',
  'Make the bed',
  'Buy some food',
  'Jogging',
  'Watch Netflix',
];

// Days
export const days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

// Months
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const defaultAnimationTiming = 500;

export const todoColors: ITodoColor[] = [
  {
    title: 'Blank',
    color: '#fff',
  },
  {
    title: 'Red',
    color: '#f44336',
  },
  {
    title: 'Purple',
    color: '#673ab7',
  },
  {
    title: 'Blue',
    color: '#2196f3',
  },
  {
    title: 'Teal',
    color: '#009688',
  },
  {
    title: 'Green',
    color: '#4caf50',
  },
  {
    title: 'Yellow',
    color: '#ffeb3b',
  },
  {
    title: 'Orange',
    color: '#ff9800',
  },
  {
    title: 'Silver',
    color: '#bdc3c7',
  },
];
