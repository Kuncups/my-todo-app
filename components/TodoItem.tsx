import React from "react";
import { Checkbox } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface TodoItemProps {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    };
    onDeleteTodo: () => void;
    onToggleComplete: () => void;
    onEditTodo: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    onDeleteTodo,
    onToggleComplete,
    onEditTodo,
}) => {
    return (
        <div
            className={`p-4 border-b border-gray-300 flex justify-between items-center animate-${todo.completed ? "fade-out" : "fade-in"
                }`}
        >
            <div>
                <Checkbox
                    checked={todo.completed}
                    onChange={onToggleComplete}
                    className="mr-2"
                ></Checkbox>
                <span
                    className={`ml-2 ${todo.completed
                        ? "bg-green-500 rounded-md p-1 text-white font-semibold"
                        : "text-black"
                        }`}
                >
                    {todo.completed ? "Completed" : ""}
                </span>
                <span
                    className={`ml-2 ${todo.completed ? "line-through font-semibold" : "text-black"
                        }`}
                >
                    {todo.title}
                </span>
            </div>
            <div>
                <DeleteOutlined
                    onClick={onDeleteTodo}
                    className="text-danger cursor-pointer"
                />
                <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    onClick={onEditTodo}
                >
                    <EditOutlined />
                </span>
            </div>
        </div>
    );
};

export default TodoItem;
