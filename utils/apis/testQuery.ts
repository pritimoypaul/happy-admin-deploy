import { useQuery } from "@tanstack/react-query";

async function getTodos() {
  try {
    return {
      data: "hello world",
    };
  } catch (e) {
    return e;
  }
}

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
