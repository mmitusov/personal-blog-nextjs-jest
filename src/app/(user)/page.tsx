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

const Home = async () => {
  const posts = await client.fetch(query)
  console.log(posts)

  return (
    <main className="">
      <BlogList posts={posts}/>
    </main>
  )
}

export default Home