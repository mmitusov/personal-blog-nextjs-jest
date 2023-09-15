import Link from "next/link";
import { HiArrowUturnLeft } from "react-icons/hi2";

//props.renderDefault(props) - Позволяет сохранить дефолтные UI елементы от Sanity
const StudioCustomNavbar = (props: any) => {
  return (
    <>
      <div className="flex items-center justify-between p-5">
        <Link href='/' className="flex items-center text-[#F7AB0A]">
          <HiArrowUturnLeft className="h-6 w-6 mr-2 text-[#F7AB0A]"/>
          Go back to the website
        </Link>
      </div>
      {props.renderDefault(props)}
    </>
  )
}

export default StudioCustomNavbar