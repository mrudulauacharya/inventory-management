import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import authReducer from "./authReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
