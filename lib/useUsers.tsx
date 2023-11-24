import useSwr from "swr";

import fetcher from "./fetcher";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/getUsers", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
