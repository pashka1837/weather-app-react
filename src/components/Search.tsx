type SearchFormProps = {
  action: (payload: FormData) => void;
  pending: boolean;
};

export function Search({ action, pending }: SearchFormProps) {
  return (
    <form
      action={action}
      className="flex gap-2 items-end mr-auto ml-auto w-[100%] sm:w-[80%] lg:w-[50%]"
    >
      <div className="flex flex-col gap-1 w-[100%]">
        <label htmlFor="search" className="text-xs">
          Название города
        </label>
        <input
          required
          pattern={`^[a-zA-Z\u0401\u0451\u0410-\u044f]{1,10}[\\s\\-]?[a-zA-Z\u0401\u0451\u0410-\u044f]{0,10}$`}
          type="text"
          className="border-teal-400 rounded-sm  focus:outline-teal-400 h-[32px]"
          style={{ borderWidth: "1px" }}
          id="search"
          name="search"
          aria-describedby="искать город"
        />
      </div>
      <button
        disabled={pending}
        type="submit"
        className="mt-3 rounded-md py-1 px-3 bg-teal-400 text-white
        disabled:bg-teal-200
        hover:bg-teal-600
        cursor-pointer"
      >
        <span role="status">Поиск</span>
      </button>
    </form>
  );
}
