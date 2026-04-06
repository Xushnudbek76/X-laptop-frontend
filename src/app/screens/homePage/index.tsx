import MostPopular from "./MostPopular";
import NewLaptops from "./Newlaptops";

export default function  HomePage() {
    return <div className="homepage">
        <MostPopular />
        <NewLaptops />
    </div>
}