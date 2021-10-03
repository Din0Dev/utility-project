import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodosList } from "redux/actions";
import type { NextPage } from "next";
import Link from "next/link";
import useGetTodoList from "hooks/todos/useGetTodoList";
import { List } from "interfaces";
import { TodoModel } from "interfaces/models";
import todoServices from "services/todoServices";

interface IHome {
  todoList: List<TodoModel>;
}

const Home: NextPage<IHome> = ({ todoList }) => {
  const dispatch = useDispatch();
  const { data, loading } = useGetTodoList();

  useEffect(() => {
    //* Example dispatch action redux
    dispatch(getTodosList({}));
  }, []);

  return (
    <div>
      {todoList.map((todo) => (
        <div key={todo.id}>
          <Link href={`/todo/${todo.id}`}>
            <a>
              {todo.id} - {todo.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const response = await todoServices.getTodos();
  const todoList = response?.data || [];
  return {
    props: {
      todoList,
    }, // will be passed to the page component as props
  };
}

export default Home;
