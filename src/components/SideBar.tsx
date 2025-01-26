import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import GrainIcon from '@mui/icons-material/Grain';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function SideBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    function queryCategory(event: any) {
        const category = event.target.closest('div').querySelector('p').innerText.toLowerCase();
        const newParams = new URLSearchParams(searchParams); // Clone existing params
        newParams.set("category", category.toLowerCase()); // Add or update the "q" parameter

        if (location.pathname === "/") {
            setSearchParams(newParams); // Update the URL with the new parameters
        } else {
            navigate({
                pathname: "/",
                search: newParams.toString(),
            });
        }
    }

    return <div className="SideBar">
        <h2>Categories</h2>
        <Link to={"/"}>
            <div className="Category" onClick={() => navigate("/")}>
                <HomeIcon/>
                <p>Homepage</p>
            </div>
        </Link>
        <Link to={"/?category=academic"}>
            <div className="Category" onClick={queryCategory}>
                <MenuBookIcon/>
                <p>Academic</p>
            </div>
        </Link>
        <Link to={"/?category=advice"}>
            <div className="Category" onClick={queryCategory}>
                <QuestionAnswerIcon/>
                <p>Advice</p>
            </div>
        </Link>
        <Link to={"/?category=accomodation"}>
            <div className="Category" onClick={queryCategory}>
                <AirlineSeatIndividualSuiteIcon/>
                <p>Accomodation</p>
            </div>
        </Link>
        <Link to={"/?category=course"}>
            <div className="Category" onClick={queryCategory}>
                <SchoolIcon/>
                <p>Course</p>
            </div>
        </Link>
        <Link to={"/?category=miscellaneous"}>
            <div className="Category" onClick={queryCategory}>
                <GrainIcon/>
                <p>Miscellaneous</p>
            </div>
        </Link>
    </div>
}