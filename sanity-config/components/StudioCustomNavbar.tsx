import Link from "next/link";
import { HiArrowUturnLeft } from "react-icons/hi2";

//props.renderDefault(props) - Позволяет сохранить дефолтные UI елементы
const StudioCustomNavbar = (props: any) => {
  return (
    <>
      <Link href='/'>Go back to the website</Link>
      <HiArrowUturnLeft />
      {props.renderDefault(props)}
    </>
  )
}

export default StudioCustomNavbar