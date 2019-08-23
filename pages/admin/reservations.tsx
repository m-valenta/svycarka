import * as b from "bobril";
import {
  IAdminReservationStore,
  IAdminReservation
} from "../../data/admin/types";
import { appStore } from "../../data/appStore";

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
        <Reservations reservations={this.store.Reservations} />
      </div>
    );
  }
}

function Reservations(data: {
  reservations: IAdminReservation[];
}): b.IBobrilNode {
  const children = [];
  for (let reservation of data.reservations) {
    children.push(
      <div style={{borderBottom: "solid 1px black"}}>{`${reservation.id}|${reservation.state}|${reservation.dateFrom}|${
        reservation.duration
      }|${reservation.name}||${reservation.address}${reservation.email}|${reservation.phone}|${
        reservation.price
      }|${reservation.beer}|${reservation.meat}|${
        reservation.usedCulture
      }`}</div>
    );
  }

  return <div style={{ width: 800 }}>{children}</div>;
}

export const reservationsPage = b.component(ReservationsPage);
