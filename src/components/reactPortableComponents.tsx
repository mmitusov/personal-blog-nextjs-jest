// import Image from "next/image";
// import Link from "next/link";
// import imgUrlSanity from "../../sanity-config/utils/imgUrl";

export const reactPortableComponents = {
  normal: (props: any) => <h4 className="p-10 text-3xl text-blue-700 font-extrabold" {...props} />,
  p: (props: any) => <p className="text-blue-700 font-extrabold" {...props} />,
  li: ({ children }: any) => <li className="text-blue-700 font-extrabold">{children}</li>,
  h1: (props: any) => <h1 className="text-blue-700 font-extrabold" {...props} />,
  h2: (props: any) => <h2 className="text-blue-700 font-extrabold" {...props} />,
  h3: (props: any) => <h3 className="text-blue-700 font-extrabold" {...props} />,
  h4: (props: any) => <h4 className="text-blue-700 font-extrabold" {...props} />,
}