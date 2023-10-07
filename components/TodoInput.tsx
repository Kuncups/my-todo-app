import React, { useState } from "react";
import { Input, Button } from "antd";

interface TodoInputProps {
    newTodo: string;
    editTodo: { id: number; text: string } | null;
    onAddTodo: () => void;
    onInputChange: (value: string) => void;
    onCancelEdit: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
    newTodo,
    editTodo,
    onAddTodo,
    onInputChange,
    onCancelEdit,
}) => {
    return (
        <div className="flex items-center mb-4">
            <Input
                placeholder={editTodo ? "Edit the task..." : "Add a new task..."}
                value={newTodo}
                onChange={(e) => onInputChange(e.target.value)}
                onPressEnter={onAddTodo}
                className="w-full mr-2"
            />
            <Button
                type="primary"
                onClick={onAddTodo}
                className="bg-blue-600 text-white"
            >
                {editTodo ? "Edit" : "Add"}
            </Button>
            {editTodo && (
                <Button
                    type="danger"
                    className="bg-red-600 hover:bg-red-500 ml-2 text-white"
                    onClick={onCancelEdit}
                >
                    Cancel
                </Button>
            )}
        </div>
    );
};

export default TodoInput;
