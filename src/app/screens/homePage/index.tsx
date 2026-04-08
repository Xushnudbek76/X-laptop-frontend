import CompanyVideo from "./CompanyVideo";
import MostPopular from "./MostPopular";
import News from "./New";
import NewLaptops from "./Newlaptops";
import ActiveUsers from "./TopUsers";

export default function  HomePage() {
    return <div className="homepage">
        <MostPopular />
        <NewLaptops />
        <CompanyVideo/>
        <ActiveUsers/>
        <News/>
    </div>
}