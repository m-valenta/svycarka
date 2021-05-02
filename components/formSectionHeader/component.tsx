import * as b from "bobril"
import * as styles from "./styles";

export interface IFormSectionHeaderData {
    text: string;
}

export function FormSectionHeader(data: IFormSectionHeaderData): b.IBobrilNode {
    return <div style={styles.headerStyle}>{data.text}</div>
}