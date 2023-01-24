import {SpotMinimal} from "../../models/Spot";

import {useNavigate} from "react-router-dom";
import CustomCard from "../ui/custom-mui-components/CustomCard";

type SpotItemProps = {
    spot: SpotMinimal
}
export default function SpotItem(props: SpotItemProps) {
    const navigate = useNavigate()

    function handleGoToDetails() {
        navigate("/spots/" + props.spot.id + "/details")
    }

    return (<CustomCard
            onClick={handleGoToDetails}
            subtitle={props.spot.disciplines.join(", ").toLowerCase()}
            avatarLetter={props.spot.name.charAt(0)}
            title={props.spot.name}/>
    )
}