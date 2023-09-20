import BlogList from "@/components/BlogList";
import { groq } from "next-sanity";
import { client } from "../../../sanity-config/utils/sanity.client";

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export const Home = async () => {
  const posts = await client.fetch(query)
  console.log(posts)

  return (
    <main className="">
      <BlogList posts={posts}/>
      Hello!!!
    </main>
  )
}
