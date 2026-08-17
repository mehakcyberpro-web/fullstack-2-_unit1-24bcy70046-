import Navbar from "../components/Navbar";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSelectors";


const Home = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h1>α-Draft Management System</h1>
        <h2>Welcome {user?.name}</h2>

        <p>Role: {user?.role}</p>

        <p>
          Create, manage and organize your drafts using Redux Toolkit.for all social platforms one platform to post everywhere
          
        </p>
      </div>
    </>
  );
};

export default Home;