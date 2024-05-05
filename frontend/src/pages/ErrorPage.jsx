import MainNavigation from "../components/MainNavigation";
import '../components/ProductList.css';
import '../App.css'


const ErrorPage = () => {
    return (
        <>
            <MainNavigation></MainNavigation>
            <div className="default">
                <h1 className="store__status">Oops, something went wrong!</h1>
                <p className="store__status">Sorry about that.</p>
            </div>
        </>
    )
}



export default ErrorPage;