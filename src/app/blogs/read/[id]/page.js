import GetBlogParts from "./GetBlogParts";
import Navbar from "../../../components/Navbar";

export default function Page({ params }) { // Correct the typo from 'parmas' to 'params'
    const { id } = params;


    return (
        <>
            <Navbar />
            <GetBlogParts id={id} />
        </>
    );
}
