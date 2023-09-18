import { useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
const Loader = () => {
    const isLoading = useSelector(state => state.isLoading)
    return (
        <div className="flex p-6 justify-center">
            <MoonLoader
                loading={isLoading}
                size={"30px"}
                color="#36d7b7" />
        </div>
    )
}
export default Loader