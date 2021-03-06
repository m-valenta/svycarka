import * as b from "bobril";
import {contentSize, infoPagesStyle} from "../styleConstants";
import { IconSet } from "../components/reservationSection/component";
import { wifi_svg, nodog_svg, nosmoke_svg } from "../src/assets";
import { t } from "bobril-g11n";

const increaseSize: Set<number> = new Set();
increaseSize.add(1);
increaseSize.add(2);

export class AccomodationRulesPage extends b.Component {
  render(): b.IBobrilNode {
    return (
      <div style={infoPagesStyle.wrapperStyle}>
        <h1 style={infoPagesStyle.h1Style}>{t("Ubytovací řád objektu")}</h1>
        <p style={infoPagesStyle.paragraphStyle}>
        {t(`Host se při příjezdu prokazuje platným průkazem totožnosti (občanským
          průkazem nebo cestovním pasem).`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Při nástupu obdrží klíče, žádáme vás o zamykání objektu. V případě
          ztráty klíčů je host povinen zaplatit 2000 Kč.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Při předání chalupy vás žádáme o její úklid. Vše je zapotřebí uvést do
          stavu, ve kterém se chalupa nacházela při vašem příjezdu. Pokud se tak
          nestane, bude vám doúčtován poplatek 700 Kč za úklid.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Příjezd na chalupu při týdenním pobytu je v sobotu ve 14 hod. nebo dle
          předchozí domluvy. Ukončení pobytu následující sobotu, s vyklizením
          chalupy do 10 hod., nedodrží-li host tuto dobu, bude mu účtována cena
          za další den pobytu (pokud není domluveno jinak). V případě zkráceného
          pobytu je odjezd i příjezd po předchozí domluvě.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`V případě poškození majetku na ubytovacím zařízení host platí náhradu
          v plné výši (za poškození inventáře se považuje také vaření na pokoji
          nebo kouření v objektu). Dospělá osoba nese plnou odpovědnost za
          případné škody způsobené dítětem. Právo na náhradu škody musí být
          uplatněno v den odjezdu bez zbytečného odkladu, nejpozději však do 15
          dnů po dni, kdy se poškozený o škodě dověděl.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Na pokojích je zakázáno přemíšťování nábytku a zásahy do elektrické či
          jiné instalace.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`V pokojích není dovoleno používat vlastních spotřebičů, kromě těch,
          které slouží hostům k jejich osobní hygieně (holicí a masážní strojky,
          vysoušeče vlasů apod.) a osobní počítače.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Na pokojích nevařte, nejsou k tomuto účelu vybavené. Pro přípravu
          pokrmů můžete využít zařízení kuchyně v přízemí.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Při odchodu z pokoje prosíme uzavřít okna, vodovodní kohoutky
          a zhasnout světla.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Na pokojích a ve všech interiérech ubytování je přísně zakázáno
          kouřit! Host je povinen chovat se v objektu tak, aby nevznikl požár.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Rodiče (popř. zák. zástupci) odpovídají za bezpečnost svých dětí ve
          všech prostorech i v jeho venkovní části.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`V době od 22:00 do 6:00 je v objektu, včetně venkovních prostor, režim
          nočního klidu, kdy je host povinen chovat se tak, aby nerušil ostatní
          nadměrným hlukem.
          `)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>{t("Domácí mazlíčky prosím nechejte doma.")}</p>
        <p style={infoPagesStyle.paragraphStyle}>{t("Host je povinen uhradit cenu za ubytování dle platného ceníku.")}</p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Není povoleno ubytovat osoby, které nebyly ubytovateli řádně
          přihlášeny k ubytování.
          `)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>{t("Při ukončení pobytu host předá pokoj pověřené osobě.")}</p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Parkování vozidel hostů je možné na parkovišti u Švýcarky, ubytovatel
          neručí za případné odcizení vozidla nebo věci v něm.`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>
          {t(`Každý ubytovaný host, je povinen dodržovat tento ubytovací řád.
          V případě, že jej závažným způsobem poruší, má majitel ubytování právo
          od smlouvy o poskytnutí ubytovací služby odstoupit před uplynutím
          dohodnuté doby, a to bez náhrady (za hrubé porušení se považuje
          opakované porušování nočního klidu, ničení movitých a nemovitých částí
          objektu, hrubé a nevhodné chování k ostatním hostům
          a k provozovateli).`)}
        </p>
        <p style={infoPagesStyle.paragraphStyle}>{t("Uvítáme všechny návrhy na zlepšení provozu.")}</p>
        <IconSet increaseSize={increaseSize} useLowerMargin={true}>
          {[
            b.asset(wifi_svg),
            b.asset(nodog_svg),
            b.asset(nosmoke_svg)
          ]}
        </IconSet>
        <h2 style={infoPagesStyle.h2Style}>{t("Kontakt na majitele:")}</h2>
        <p style={infoPagesStyle.paragraphStyle}>{t("Martin Jiráský &nbsp;&nbsp; +420 720 630 136")}</p>
      </div>
    );
  }
}

export const accomodationRulesPage = b.component(AccomodationRulesPage);
