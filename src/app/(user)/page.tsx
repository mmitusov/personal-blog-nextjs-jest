import BlogList from "@/components/BlogList";
import { groq } from "next-sanity";

export default function Home() {
  const query = groq`
    *[_type=='post'] {
      ...,
      author->,
      categories[]->
    } | order(_createdAt desc)
  `;
  
  return (
    <main className="">
      <BlogList posts={posts}/>
      Hello!!!
    </main>
  )
}
