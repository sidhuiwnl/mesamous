export default function User() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold antialiased tracking-tighter">
        Type Your Anonmyous Message.
      </h1>
      <textarea
        className="w-[900px] h-[200px] mt-10 rounded-xl text-black placeholder:text-black bg-neutral-300 p-4 text-top resize-none"
        placeholder="Hloo user! How are you?..."
      />
    </div>
  );
}
