import imgUrlSanity from "../../sanity-config/utils/imgURL";

interface BlogListProps {
  posts: Post[]; //Typed from typings.d.ts
}

const BlogList = ({posts}: BlogListProps) => {
  return (
    <div>
      <hr className="border-[#F7AB0A] mb-10"/>
      <div>
        {posts.map((post) => (
            <div key={post._id} className="flex flex-col group cursor-pointer">
              <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                <img 
                  className="object-cover object-left lg:object-center"
                  src={imgUrlSanity(post.mainImage).url()}
                  alt={post?.author?.name ? post?.author?.name : 'Author not specified'}
                />

                <div className="flex justify-between absolute bottom-0 w-full bg-black bg-opacity-20 backdrop-blur-lg text-white p-5">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p> 
                      {new Date(post._createdAt).toLocaleDateString(
                        "en-US", {
                          day: "numeric", 
                          month: "long",
                          year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-y-2 md:flex-row md:gap-x-2">
                    {post?.categories 
                      ? 
                        post?.categories?.map(category => (
                          <div className="bg-[#F7AB0A] text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                            <p>{category?.title ? category?.title : "No categories provided"}</p>
                          </div>
                        ))
                      : 
                        <div className="bg-[#aa61e2] text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                          <p>No categories provided</p>
                        </div>
                    }
                  </div>
                </div>
              </div>

              <div className="mt-5 flex-1">
                <p className="underline text-lg font-bold line-clamp-2">{post.title}</p>
                <p className="text-gray-500">{post.description}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList