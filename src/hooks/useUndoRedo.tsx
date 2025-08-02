import { useState, useCallback } from 'react';

export interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

export const useUndoRedo = <T,>(initialState: T) => {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialState,
    future: []
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    setState(currentState => {
      const newPast = currentState.past.slice(0, -1);
      const newPresent = currentState.past[currentState.past.length - 1];
      const newFuture = [currentState.present, ...currentState.future];

      return {
        past: newPast,
        present: newPresent,
        future: newFuture
      };
    });
  }, [canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    setState(currentState => {
      const newPast = [...currentState.past, currentState.present];
      const newPresent = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      return {
        past: newPast,
        present: newPresent,
        future: newFuture
      };
    });
  }, [canRedo]);

  const pushState = useCallback((newState: T) => {
    setState(currentState => ({
      past: [...currentState.past, currentState.present],
      present: newState,
      future: []
    }));
  }, []);

  const reset = useCallback((newState: T) => {
    setState({
      past: [],
      present: newState,
      future: []
    });
  }, []);

  return {
    state: state.present,
    undo,
    redo,
    canUndo,
    canRedo,
    pushState,
    reset
  };
};