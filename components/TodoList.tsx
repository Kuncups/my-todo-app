import React, { useState, useEffect } from "react";
import { Card, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../utils/api";
import Swal from "sweetalert2";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editTodo, setEditTodo] = useState<{ id: number; text: string } | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage, setTasksPerPage] = useState<number>(5); // Jumlah tugas per halaman
  const pageSizeOptions = ["5", "10", "20"]; // Opsi jumlah tugas per halaman

  useEffect(() => {
    // Fetch todos when the component mounts
    fetchTodos()
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      if (editTodo) {
        // Jika ada tugas yang diedit, perbarui tugas yang ada
        const updatedTodos = todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, title: newTodo } : todo
        );
        setTodos(updatedTodos);
        setEditTodo(null); // Setel editTodo menjadi null setelah penyuntingan
        Swal.fire("Success", "Task updated successfully!", "success"); // Menampilkan SweetAlert untuk pemberitahuan
      } else {
        // Jika tidak ada tugas yang diedit, tambahkan tugas baru
        const newTodoObj = {
          userId: 1, // Ganti dengan ID pengguna yang sesuai
          id: todos.length + 1,
          title: newTodo,
          completed: false,
        };

        setTodos([newTodoObj, ...todos]); // Tambahkan tugas baru ke awal array
        Swal.fire("Success", "Task added successfully!", "success"); // Menampilkan SweetAlert untuk pemberitahuan
      }

      setNewTodo("");
    } else {
      Swal.fire("Error", "Task title cannot be empty!", "error"); // Menampilkan SweetAlert untuk kesalahan
    }
  };

  const deleteTodo = (id: number) => {
    // Tampilkan SweetAlert konfirmasi sebelum menghapus
    Swal.fire({
      title: "Delete Task",
      text: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus tugas jika pengguna menyetujui
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);

        Swal.fire("Deleted!", "The task has been deleted.", "success");
      }
    });
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditTodo({ id, text });
    setNewTodo(text); // Setel nilai input menjadi teks yang akan disunting
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hitung indeks tugas terakhir dan pertama pada setiap halaman
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  // Ambil tugas yang sesuai dengan halaman saat ini
  const currentTasks = filteredTodos.slice(indexOfFirstTask, indexOfLastTask);

  // Fungsi yang dipanggil ketika halaman berubah
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fungsi yang dipanggil ketika jumlah tugas per halaman berubah
  const handlePageSizeChange = (current: number, size: number) => {
    setTasksPerPage(size);
  };

  return (
    <div className="flex items-center bg-gray-100 min-h-screen p-6">

      <Card
        className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
      >
        <h1 className="flex items-center justify-center mb-4 text-3xl font-bold text-black">To Do Application</h1>
        <Input
          placeholder="Search for a task..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
          prefix={<SearchOutlined />}
        />
        <TodoInput
          newTodo={newTodo}
          editTodo={editTodo}
          onAddTodo={addTodo}
          onInputChange={setNewTodo}
          onCancelEdit={() => {
            setEditTodo(null);
            setNewTodo("");
          }}
        />
        <div className="rounded-lg border border-gray-300">
          {currentTasks.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={() => deleteTodo(todo.id)}
              onToggleComplete={() => {
                todo.completed = !todo.completed;
                setTodos([...todos]);
              }}
              onEditTodo={() => handleEditTodo(todo.id, todo.title)}
            />
          ))}
        </div>
        <div className="flex items-right justify-end mt-4">
          <Pagination
            current={currentPage}
            total={filteredTodos.length}
            pageSize={tasksPerPage}
            onChange={handlePageChange}
            showSizeChanger
            onShowSizeChange={handlePageSizeChange}
            pageSizeOptions={pageSizeOptions}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} tasks`
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default TodoList;
