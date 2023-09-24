import { groq } from "next-sanity";
import { client } from "../../../../../sanity-config/utils/sanity.client";
import Image from "next/image";
import imgUrlSanity from "../../../../../sanity-config/utils/imgUrl";
import PortableText from "react-portable-text"
import { reactPortableComponents } from "@/components/reactPortableComponents";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateStaticParams() {
  //Getting list of all slugs that we have
  const query = groq`
    *[_type=='post'] 
    {
      slug
    }
  `; 

  //Fetching data about each separate slug
  const slugs: Post [] = await client.fetch(query) ;
  // const slugRoutes = slugs.map((slug) => slug.slug.current);

  //Далее вытянем инфу каждого отдельного slug, которая далее передасться в - {params: {slug}
  return slugs.map((slug) => ({
    slug: slug.slug.current, //dynamic_route_id: slug_name,
  }));
}

const Post = async ({params: {slug}}: Props) => {
  const queryAuthor = groq`
    *[_type=='post' && slug.current == $slug][0] {
      ...,
      author->,
    }
  `;
  const queryCategories = groq`
    *[_type=='post' && slug.current == $slug][0] {
      ...,
      categories[]->
    }
  `;
  const postAuthor: Post = await client.fetch(queryAuthor, {slug})
  const postCategories: Post = await client.fetch(queryCategories, {slug})
  // console.log(postAuthor?.body[0]?.children[0]?.text)

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white">
        <div className="relative flex flex-col md:flex-row justify-between min-h-56">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image 
              className="object-cover object-center mx-auto"
              src={imgUrlSanity(postAuthor?.mainImage).url()}
              alt={postAuthor?.author?.name}
              fill
            />
          </div>

          <section className="p-5 bg-[#F7AB0A] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">
                  {postAuthor.title}
                </h1>
                <p> 
                  {new Date(postAuthor._createdAt).toLocaleDateString(
                    "en-US", {
                      day: "numeric", 
                      month: "long",
                      year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image 
                  className="rounded-full"
                  src={imgUrlSanity(postAuthor?.author?.image).url()}
                  alt={postAuthor?.author?.name}
                  height={40}
                  width={40}
                />
                <div className="w-64">
                  <h3 className="text-lg font-bold">{postAuthor?.author?.name}</h3>
                   <div>{/*Author Bio*/}</div> 
                </div>
              </div>
            </div>

            <div>
              <h2 className="italic pt-10">{postAuthor?.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {postCategories?.categories 
                  ? 
                    postCategories?.categories?.map(category => (
                      <div key={category?._id} className="bg-gray-800 text-white text-center px-3 py-1 mt-4 rounded-full text-sm font-semibold">
                        <p>{category?.title}</p>
                      </div>
                    ))
                  : 
                    <div className="bg-[#aa61e2] text-center text-white px-3 py-1 mt-4 rounded-full text-sm font-semibold">
                      <p>No categories provided</p>
                    </div>  
                }
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText content={postAuthor?.body} serializers={reactPortableComponents}/>
    </article>
  )
}

export default Post