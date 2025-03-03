import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from './features/userSlice';
import taskReducer from './features/taskSlice';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these field paths in all actions
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      // Ignore these paths in the state
      ignoredPaths: ['register'],
    },
  }).concat(thunk),
});
export const persistor = persistStore(store);