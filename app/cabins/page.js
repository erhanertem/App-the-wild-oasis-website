import Counter from "../components/Counter";

async function Page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  console.log(data);

  return (
    <div>
      <h1>Cabins page</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <Counter users={data} />
    </div>
  );
}

export default Page;
