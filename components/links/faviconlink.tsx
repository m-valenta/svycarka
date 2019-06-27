import * as b from "bobril";
import { getLinkHref } from "../../utils/resourceUtils";

export class FavIconLink extends b.Component {
    render() {
        return <link rel="shortcut icon" href={getLinkHref(b.asset("../../assets/favicon.ico"))} type="image/x-icon" />
    }
}

export const favIconLink = b.component(FavIconLink);