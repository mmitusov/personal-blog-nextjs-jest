interface BlogListProps {
  posts: Post[]; //Typed from typings.d.ts
}

const BlogList = ({posts}: BlogListProps) => {
  return (
    <div>BlogList</div>
  )
}

export default BlogList