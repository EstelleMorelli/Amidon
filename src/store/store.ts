import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import catalogReducer from './reducers/catalogReducer';
import appReducer from './reducers/appReducer';

const store = configureStore({
  reducer: {
    userReducer,
    catalogReducer,
    appReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
