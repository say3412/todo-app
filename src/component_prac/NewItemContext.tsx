import { createContext, useRef } from "react";

type NewItem = {
  id: number;
  isDone: boolean;
  content: string;
  createdate: number;
};

type CrateItem = {
    todo: NewItem;
    createTodo: (content: string) => void;
}

const idRef = useRef(3);

const Create = createContext<CrateItem>({
  todo: {id: idRef.current, isDone: false, content:'', createdate: new Date().getTime()},
  createTodo: (content: string) => {}
})

