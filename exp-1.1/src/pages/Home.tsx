import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h1>Draft Management System</h1>

        <p>
          Create, manage and organize your drafts using Redux Toolkit.
        </p>
      </div>
    </>
  );
};

export default Home;