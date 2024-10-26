"use client";

import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);

  console.log(users);

  return (
    <>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((curr) => curr + 1)}>{count}</button>;
    </>
  );
}

export default Counter;
