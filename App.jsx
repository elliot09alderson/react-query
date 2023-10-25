import React from "react";
import axios from "axios";
import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from "@tanstack/react-query";

const Profile = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["my"],
    queryFn: () =>
      axios.get("https://catfact.ninja/fact").then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  return (
    <div>
      <h1>{data?.fact}</h1>
      <button onClick={refetch}>REFETCH</button>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    </div>
  );
};

export default App;
