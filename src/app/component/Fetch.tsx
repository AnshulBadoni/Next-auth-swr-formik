"use client"
import useSWR from 'swr'
import { signOut } from "next-auth/react"
import FormikForm from './FormikForm'

const fetcher = (...args: [string, RequestInit?]) => fetch(...args).then((res) => res.json())

export default function Fetch() {
  const { data, error, isLoading } = useSWR<Posts>('https://jsonplaceholder.typicode.com/posts/1', fetcher)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <main className="flex h-52 flex-col items-center justify-between ">
      {/* <ul> */}
      {/* {data?.map(post => ( */}
        {/*  <li key={post.id}> */}
          {/* <h2>{post.title}</h2> */}
          {/* <p>{post.body}</p> */}
        {/* </li> */}
      {/* ))} */}
     {/* </ul> */}
    Data from api using swr : {data?.title}
    <FormikForm />
      <button onClick={() => signOut()}>Sign Out</button>

    </main>
  )
}

interface Posts {
  userId: number
  id: number
  title: string
  completed: boolean
}