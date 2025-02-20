import { useActionState } from "react";
import { Search } from "./Search";

async function handleSubmit(
  formState: SearchFormStateType | null,
  formData: FormData
): Promise<SearchFormStateType> {
  const search = formData.get("search");
  console.log(search);
  return {
    success: false,
    msg: "error",
    data: null,
  };
}

export function Home() {
  const [state, action, pending] = useActionState(handleSubmit, null);
  return (
    <div className="flex p-4  md:p-5">
      <Search action={action} pending={pending} />
    </div>
  );
}
