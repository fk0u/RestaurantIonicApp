import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartItem, TableInfo } from '../data/constants';

interface AppState {
  cart: CartItem[];
  lastOrder: CartItem[] | null;
  selectedTable: TableInfo | null;
  guestCount: number;
  orderMode: 'dine-in' | 'take-away';
  lang: 'ID' | 'EN';
}

type Action =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'COMPLETE_ORDER' }
  | { type: 'SET_TABLE'; payload: TableInfo | null }
  | { type: 'SET_GUESTS'; payload: number }
  | { type: 'SET_MODE'; payload: 'dine-in' | 'take-away' }
  | { type: 'SET_LANG'; payload: 'ID' | 'EN' };

const initialState: AppState = {
  cart: [],
  lastOrder: null,
  selectedTable: null,
  guestCount: 2,
  orderMode: 'dine-in',
  lang: 'ID',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, cart: state.cart.filter(i => i.id !== action.payload.id) };
      }
      return {
        ...state,
        cart: state.cart.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'COMPLETE_ORDER':
      return { ...state, lastOrder: [...state.cart], cart: [] };
    case 'SET_TABLE':
      return { ...state, selectedTable: action.payload };
    case 'SET_GUESTS':
      return { ...state, guestCount: Math.max(1, Math.min(12, action.payload)) };
    case 'SET_MODE':
      return { ...state, orderMode: action.payload };
    case 'SET_LANG':
      return { ...state, lang: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export type { AppState, Action };
