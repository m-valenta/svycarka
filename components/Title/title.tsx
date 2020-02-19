import * as b from "bobril";
import { t } from "bobril-g11n";

export function PageTitle(): b.IBobrilNode {
    return <title>{t("Chata švýcarka", undefined, "page title")}</title>
}

export const pageTitle = b.component(PageTitle);