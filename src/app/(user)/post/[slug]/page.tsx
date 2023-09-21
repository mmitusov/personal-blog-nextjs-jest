import { groq } from "next-sanity";
import { client } from "../../../../../sanity-config/utils/sanity.client";

interface Props {
  params: {
    slug: string;
  }
}

const Post = async ({params: {slug}}: Props) => {
  const query = groq`
    *[_type=='post' && slug.current == $slug][0] {
      ...,
      author->,
      categories[]->
    }
  `;
  const post: Post = await client.fetch(query, {slug})
  console.log(post)

  return (
    <div>Post: {slug}</div>
  )
}

export default Post