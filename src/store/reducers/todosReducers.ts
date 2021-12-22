import {generateID} from '../../utils/functions';
import {ITodo, TodosActions, TodosActionsTypes} from '../types/todosTypes';

const initialState = {
  list: [] as ITodo[],
};

export const todosReducer = (
  state = initialState,
  action: TodosActionsTypes,
) => {
  let list: ITodo[] = [];
  let index = 0;

  switch (action.type) {
    case TodosActions.ADD_TODO:
      const now = Date.now();

      const todo: ITodo = {
        id: generateID(),
        created_at: now,
        started_at: 0,
        finished_at: 0,
        category: 'default',
        wasCompleted: false,
        title: action.payload.title,
        seconds: 0,
      };

      return {
        list: [todo, ...state.list],
      };

    case TodosActions.EDIT_TODO:
      list = JSON.parse(JSON.stringify(state.list));

      if (state.list.length >= 1) {
        index = state.list.findIndex((i: ITodo) => i.id === action.payload.id);
        list[index] = {...list[index], ...action.payload};
      }

      return {list};

    case TodosActions.DELETE_TODO:
      if (state.list.length >= 1) {
        list = state.list.filter((i: ITodo) => i.id !== action.payload.id);
      }

      return {list};

    case TodosActions.UPDATE_TODO_LIST:
      return {list: action.payload.list};

    default:
      return state;
  }
};
