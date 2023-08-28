import {
  Fragment,
  createElement,
  FunctionComponent,
  useEffect,
  useState,
  FunctionComponentElement,
  useContext,
} from "react";
import { Modal } from "@react95/core";
import { RenderedWindowContext, WindowContext } from "./WindowContext";
import { nanoid } from "nanoid";
import styled from "styled-components";

interface RenderedWindowComponent {
  id: string;
  key: string;
}

export type WindowStack = {
  stack: Record<
    string,
    [
      FunctionComponent,
      Omit<React.ComponentProps<typeof Modal>, "closeModal" | "children">
    ]
  >;
};

export const createWindowStack = (): WindowStack => {
  return {
    stack: {},
  };
};

export type WindowAction =
  | {
      type: "ADD_WINDOW";
      element: FunctionComponent<RenderedWindowComponent>;
      props: Omit<React.ComponentProps<typeof Modal>, "closeModal" | "title">;
    }
  | {
      type: "UPDATE_WINDOW";
      id: string;
      element: FunctionComponent<RenderedWindowComponent>;
      props: Omit<React.ComponentProps<typeof Modal>, "closeModal" | "title">;
    }
  | {
      type: "CLOSE_WINDOW";
      id: string;
    }
  | {
      type: "CLOSE_ALL_WINDOWS";
    };

export const windowStackReducer: React.Reducer<WindowStack, WindowAction> = (
  state,
  action
) => {
  const ctx = { ...state };
  switch (action.type) {
    case "ADD_WINDOW": {
      return {
        stack: { ...ctx.stack, [nanoid()]: [action.element, action.props] },
      } as any;
    }
    case "UPDATE_WINDOW": {
      return {
        stack: { ...ctx.stack, [action.id]: [action.element, action.props] },
      } as any;
    }
    case "CLOSE_WINDOW": {
      delete ctx.stack[action.id];
      return { stack: { ...ctx.stack } };
    }
    case "CLOSE_ALL_WINDOWS": {
      for (const [key, value] of Object.entries(ctx.stack)) {
        if (value !== null) {
          delete ctx.stack[key];
        }
      }

      return { stack: {} };
    }
    default:
      return state;
  }
};

interface WindowStackProps {
  windows: WindowStack;
}

const StyledModal = styled(Modal)`
  // EWWWWWW
  div:nth-child(3) {
    padding: 0;
  }

  &&& {
    padding-bottom: 0;
  }
`;

export const WindowStack = ({ windows }: WindowStackProps) => {
  const [elements, setElements] = useState<
    FunctionComponentElement<{
      key: string;
    }>[]
  >([]);

  useEffect(() => {
    setElements((elements) => {
      // find all entries in the windows stack that haven't been
      // added to the elements tree, and create the elements here
      const new_state = Object.entries(windows.stack).map(([i, _]) => {
        const entry = elements.find((x) => x.key === i);
        if (entry !== undefined) {
          return entry;
        }

        const WindowComponent = () => {
          const windowContext = useContext(WindowContext);
          const thisWindow = windowContext.stack.stack[i];
          if (thisWindow === undefined) return <></>;

          return (
            <RenderedWindowContext.Provider value={{ id: i }}>
              <StyledModal
                closeModal={() =>
                  windowContext.dispatch({ type: "CLOSE_WINDOW", id: i })
                }
                width={"640"}
                height={"640"}
                defaultPosition={{
                  x: Math.floor(window.innerWidth / 2) - 550,
                  y: Math.floor(window.innerHeight / 2) - 400,
                }}
                {...thisWindow[1]}
              >
                <div className="h-[570px] w-full inline-block bg-white overflow-clip">
                  <div className="flex flex-col min-w-0 min-h-0 h-full">
                    {createElement(thisWindow[0])}
                  </div>
                </div>
              </StyledModal>
            </RenderedWindowContext.Provider>
          );
        };

        return createElement(WindowComponent, {
          key: i,
        });
      });

      return new_state;
    });
  }, [windows.stack]);

  return <div>{...elements}</div>;
};
