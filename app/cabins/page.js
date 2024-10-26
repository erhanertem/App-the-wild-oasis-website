import Navigation from "../components/Navigation";

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
    </div>
  );
}

export default Page;
