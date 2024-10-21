import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [counter,setCounter] = useState(3)
  const router = useRouter()

  useEffect(() => {

    const countDown = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0))
    },1000)
  },[])

  useEffect(() => {
    if(counter === 0){
      router.push("/blogs")
    }
  },[counter,router])
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center text-white px-4">
      <div className="bg-white text-gray-900 shadow-xl rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-4xl font-extrabold mb-6">
          Welcome to the Blog Content Platform
        </h1>
        <p className="text-lg mb-4">
          Get ready to explore some amazing content. You will be redirected
          soon!
        </p>
        <div className="text-6xl font-bold mb-6 animate-pulse">{counter}</div>
        <p className="italic">Redirecting to posts in {counter} seconds...</p>
      </div>
    </div>
  );
}
