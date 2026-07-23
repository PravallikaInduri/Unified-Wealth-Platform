"use client";


import { useEffect, useState } from "react";


import axios from "axios";


import Sidebar from "@/components/admin/Sidebar";


import {
  FiSearch,
  FiMoreVertical,
  FiX,
} from "react-icons/fi";


interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
}


export default function UsersPage() {


  const [users, setUsers] =
    useState<User[]>([]);


  const [search, setSearch] =
    useState("");


  const [showModal, setShowModal] =
    useState(false);


  const [loading, setLoading] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState<User | null>(null);


  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      password: "",
      role_id: "",
    });


  useEffect(() => {


    fetchUsers();


  }, []);


  const fetchUsers = async () => {


    try {


      const token =
        localStorage.getItem(
          "accessToken"
        );


      const response =
        await axios.get(
          "http://localhost:5000/admin/users",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      setUsers(
        response.data.users
      );


    } catch (error) {


      console.log(error);
    }
  };

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem(
          "accessToken"
        );

      await axios.delete(
        `http://localhost:5000/admin/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchUsers();

      alert(
        "User deleted successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );
    }
  };

  const handleEdit = (
    user: User
  ) => {

    setEditingUser(user);

    setFormData({

      full_name:
        user.full_name,

      email:
        user.email,

      password: "",

      role_id:
        user.role_id.toString(),

    });

    setShowModal(true);
  };


  const handleCreateUser =
    async (
      e: React.FormEvent
    ) => {


      e.preventDefault();


      try {


        setLoading(true);


        const token =
          localStorage.getItem(
            "accessToken"
          );


        if (editingUser) {

          await axios.put(
            `http://localhost:5000/admin/users/${editingUser.id}`,
            {
              full_name:
                formData.full_name,

              email:
                formData.email,

              role_id:
                Number(
                  formData.role_id
                ),
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        } else {

          await axios.post(
            "http://localhost:5000/admin/users",
            {
              ...formData,
              role_id:
                Number(
                  formData.role_id
                ),
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );
        }


        setShowModal(false);

        setEditingUser(null);


        setFormData({
          full_name: "",
          email: "",
          password: "",
          role_id: "",
        });


        fetchUsers();


      } catch (error) {


        console.log(error);


      } finally {


        setLoading(false);
      }
    };


  const filteredUsers =
    users.filter((user) =>
      user.full_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  const getRoleName = (
    roleId: number
  ) => {


    switch (roleId) {


      case 1:
        return "ADMIN";


      case 2:
        return "OPS";


      case 3:
        return "RM";


      case 4:
        return "INVESTOR";


      default:
        return "UNKNOWN";
    }
  };


  return (
    <div className="
      min-h-screen
      bg-[#050816]
      flex
      text-white
    ">


      <Sidebar />


      <main className="
        flex-1
        px-10
        py-8
      ">


        {/* HEADER */}


        <div className="
          flex
          justify-between
          items-center
          mb-10
        ">


          <div>


            <p className="
              text-sm
              uppercase
              tracking-[4px]
              text-indigo-400
              mb-3
            ">
              User Management
            </p>


            <h1 className="
              text-5xl
              font-bold
            ">
              Platform Users
            </h1>


          </div>


          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({
                full_name: "",
                email: "",
                password: "",
                role_id: "",
              });
              setShowModal(true);
            }}
            className="
              bg-gradient-to-r
              from-indigo-500
              to-violet-600
              px-6
              py-3
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
            "
          >
            + Add User
          </button>


        </div>


        {/* SEARCH */}


        <div className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-5
          flex
          items-center
          gap-4
          mb-8
        ">


         


          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              bg-transparent
              outline-none
              w-full
              text-white
            "
          />


        </div>


        {/* TABLE */}


        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          overflow-hidden
          backdrop-blur-xl
        ">


          {/* TABLE HEADER */}


          <div className="
            grid
            grid-cols-5
            px-8
            py-5
            border-b
            border-white/10
            text-gray-400
            text-sm
            uppercase
          ">


            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
            <div>Action</div>


          </div>


          {/* TABLE BODY */}


          {filteredUsers.map((user) => (


            <div
              key={user.id}
              className="
                grid
                grid-cols-5
                px-8
                py-6
                border-b
                border-white/5
                items-center
                hover:bg-white/5
                transition
              "
            >


              <div>


                <p className="
                  font-semibold
                  text-lg
                ">
                  {user.full_name}
                </p>


              </div>


              <div className="
                text-gray-300
              ">
                {user.email}
              </div>


              <div>


                <span className="
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  bg-indigo-500/20
                  text-indigo-300
                ">
                  {getRoleName(
                    user.role_id
                  )}
                </span>


              </div>


              <div>


                <span className="
                  text-green-400
                  font-semibold
                ">
                  Active
                </span>


              </div>


              <div>


                <button className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white/5
                  flex
                  items-center
                  justify-center
                  hover:bg-white/10
                  transition
                ">


                  <div className="flex gap-2">


                    <button
                      onClick={() =>
                        handleEdit(user)
                      }
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-blue-500/20
                        text-blue-300
                      "
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-red-500/20
                        text-red-300
                      "
                    >
                      Delete
                    </button>


                  </div>


                </button>


              </div>


            </div>
          ))}


        </div>


      </main>


      {/* MODAL */}


      {showModal && (


        <div className="
          fixed
          inset-0
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
        ">


          <div className="
            w-full
            max-w-lg
            bg-[#0B1120]
            border
            border-white/10
            rounded-[32px]
            p-8
          ">


            {/* TOP */}


            <div className="
              flex
              justify-between
              items-center
              mb-8
            ">


              <div>


                <h2 className="
                  text-3xl
                  font-bold
                ">
                  {
                    editingUser
                      ? "Edit User"
                      : "Create User"
                  }
                </h2>


                <p className="
                  text-gray-400
                  mt-2
                ">
                  Add staff member
                </p>


              </div>


              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                }}
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white/5
                  flex
                  items-center
                  justify-center
                "
              >


                <FiX />


              </button>


            </div>


            {/* FORM */}


            <form
              onSubmit={
                handleCreateUser
              }
              className="
                space-y-5
              "
            >


              <input
                type="text"
                placeholder="Full Name"
                value={
                  formData.full_name
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_name:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />


              <input
                type="email"
                placeholder="Email"
                value={
                  formData.email
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required
              />


              <input
                type="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
                required={!editingUser}
              />


              <select
                value={
                  formData.role_id
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role_id:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  bg-[#111827]
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-white
                "
                required
              >


                <option
                  value=""
                  className="
                    bg-[#111827]
                  "
                >
                  Select Role
                </option>


                <option
                  value="1"
                  className="
                    bg-[#111827]
                  "
                >
                  ADMIN
                </option>


                <option
                  value="2"
                  className="
                    bg-[#111827]
                  "
                >
                  OPS
                </option>


                <option
                  value="3"
                  className="
                    bg-[#111827]
                  "
                >
                  RM
                </option>
                <option
                  value="4"
                  className="
                    bg-[#111827]
                  "
                >
                   INVESTOR
                </option>
              </select>


              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-600
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:scale-[1.01]
                  transition
                "
              >


                {
                  loading
                    ? (
                      editingUser
                        ? "Updating..."
                        : "Creating..."
                    )
                    : (
                      editingUser
                        ? "Update User"
                        : "Create User"
                    )
                }


              </button>


            </form>


          </div>


        </div>
      )}


    </div>
  );
}