import React from "react";
import profileImg from "./assets/profileImg.jpg";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card flex flex-col items-center bg-white shadow-lg rounded-lg p-7 max-w-[30rem] mx-auto mt-10">
        <img
          src={profileImg}
          alt="Profile"
          className="rounded-full w-24 h-24"
        />
        <h2 className="text-2xl font-bold mt-4">Prashant Awadhiya</h2>
        <p className="text-gray-600 mt-2 text-center">
          I'm a web developer who loves crafting clean interfaces and learning
          new tech. Always building something cool on the side!
        </p>
        <section className="pl-7 w-full">
          <h3 className="font-semibold text-gray-800 text-xl mt-4">Hobbies:</h3>
          <ul className="list-disc mt-2 text-gray-600 pl-5">
            <li>Coding</li>
            <li>Listening to Music</li>
            <li>Playing Volleyball</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default App;
