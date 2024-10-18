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
      router.push("/posts")
    }
  },[counter,router])
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the blog content platform
      </h1>
      <p className="text-lg">Counter: {counter}</p>
    </div>
  );
}
