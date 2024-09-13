
import Link from 'next/link'
import { TiArrowBack } from "react-icons/ti";

export const Goback = ({gobacklink}:{gobacklink: string}) => {
    return (
        <div>
            <Link href={`${gobacklink}`}>
            <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-flex">
                <TiArrowBack /> Go back
            </span>
            </Link>
        </div>
    )
}