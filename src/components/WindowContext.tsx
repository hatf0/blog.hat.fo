import { createContext, Dispatch } from 'react';
import { WindowStack, WindowAction } from './WindowStack';

export type RenderedWindowContext = {
  id: string;
};

export const RenderedWindowContext = createContext<RenderedWindowContext>(undefined!);

export type WindowContext = {
  stack: WindowStack;
  dispatch: Dispatch<WindowAction>;
};

export const createWindowContext = () => {
  return {
    stack: { stack: {} }
  } as WindowContext
}

export const WindowContext = createContext<WindowContext>(undefined!);