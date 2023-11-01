"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  //   function to handle state change
  const hanldeChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/"); //redirecting to home page
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create New User</h1>
        <label>Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={hanldeChange}
          required={true}
          value={formData.name}
          className="m-2 bg-slate-400 rounded outline-none"
        />
        {/*  */}
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={hanldeChange}
          required={true}
          value={formData.email}
          className="m-2 bg-slate-400 rounded outline-none"
        />
        {/*  */}
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={hanldeChange}
          required={true}
          value={formData.password}
          className="m-2 bg-slate-400 rounded outline-none"
        />
        {/*  */}
        <input
          type="submit"
          value="Create User"
          className="bg-blue-300 hover:bg-blue-100"
        />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default UserForm;