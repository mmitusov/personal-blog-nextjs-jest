import BlogList from "@/components/BlogList";
import { groq } from "next-sanity";
import { client } from "../../../sanity-config/utils/sanity.client";

// const query = groq`
//   *[_type=='post'] {
//     ...,
//     author->,
//     categories[]->
//   }
// `;

const Home = async () => {
  // const posts = await client.fetch(query)
  // console.log(posts.map(post => post._id))

  return (
    <main className="">
      <h1>TESTING</h1>
      {/* <BlogList posts={posts}/> */}
    </main>
  )
}

export default Home