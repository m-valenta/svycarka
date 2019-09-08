import * as b from "bobril";
import {
  IAdminReservationStore,
  IAdminReservation
} from "../../data/admin/types";
import { appStore } from "../../data/appStore";
import * as tableStyles from "./tableStyles";
import { getMoment } from "bobril-g11n";

export class ReservationsPage extends b.Component {
  store: IAdminReservationStore;

  init() {
    this.store = appStore().adminReservationStore;
    this.store.reset();
  }
  render() {
    return (
      <div>
        <div>Reservations</div>
        <div>Rok: {this.store.Year}</div>
        <div>Měsíc {this.store.Month + 1}</div>
        <Table reservations={this.store.Reservations} />
      </div>
    );
  }
}

class Table extends b.Component<{reservations: IAdminReservation[]}> {
  render(): b.IBobrilNode {
    const lines: b.IBobrilNode[] = this.data.reservations.map(res => <this.Row row={res} />);


    return <div style={[tableStyles.tableWrapper, {width: "100%"}]}>
      <this.HeaderRow />
      {lines}
    </div>
  }

  protected HeaderRow(): b.IBobrilNode {
    return <div style={[tableStyles.tableLine, tableStyles.headerLine]}>
        <div style={[tableStyles.tableColumn, { width: "15%" }]}>Datum od</div>
        <div style={[tableStyles.tableColumn, { width: "8%" }]}>Délka</div>
        <div style={[tableStyles.tableColumn, { width: "27%" }]}>Jméno</div>
        <div style={[tableStyles.tableColumn, { width: "28%" }]}>Adresa</div>
        <div style={[tableStyles.tableColumn, { width: "10%" }]}>Cena</div>
        <div style={[tableStyles.lastTableColumn, { width: "10%" }]}>Stav</div>
        <div style={{ clear: "both" }} />
      </div>;
  }

  protected Row(data: {row: IAdminReservation}): b.IBobrilNode {
    return <div style={tableStyles.tableLine}>
      <div style={[tableStyles.tableColumn, { width: "15%" }]}>{getMoment(data.row.dateFrom).format("DD.MM.YYYY")}</div>
      <div style={[tableStyles.tableColumn, { width: "8%" }]}>{data.row.duration}</div>
      <div style={[tableStyles.tableColumn, { width: "27%" }]}>{data.row.name}</div>
      <div style={[tableStyles.tableColumn, { width: "28%" }]}>{data.row.address}</div>
      <div style={[tableStyles.tableColumn, { width: "10%" }]}>{data.row.price == undefined ? 0 : data.row.price}</div>
      <div style={[tableStyles.lastTableColumn, { width: "10%" }]}>{data.row.state}</div>
      <div style={{ clear: "both" }} />
    </div>;
  }
}

export const reservationsPage = b.component(ReservationsPage);
