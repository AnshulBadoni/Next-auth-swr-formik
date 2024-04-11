import Fetch from "./component/Fetch";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function Home() { 
  const session = await getServerSession();
  if (!session || !session.user) {
      redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Fetch />
    </main>
  )
}

// Define the Todo interface
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}