import Menu from "@/components/Menu";
import WelcomeForm from "@/components/WelcomeForm";

const Home = () => {
  return (
    <>
      <Menu />
      <div className="h-[calc(100vh-36px)] w-full grid place-items-center px-2 sm:px-0">
        <div className="flex flex-col gap-2 text-center border border-gray-200 rounded-lg px-4 py-8 sm:px-14 sm:py-16 max-w-[40rem] w-full">
          <h1 className="font-semibold text-3xl">Welcome.</h1>
          <WelcomeForm />
        </div>
      </div>
    </>
  );
};

export default Home;
