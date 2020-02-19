import * as b from "bobril";
import { infoPagesStyle } from "../styleConstants";
import { getUrl } from "../utils/urlUtils";

const selfUrl = getUrl();

export class GdprPage extends b.Component {
  render(): b.IBobrilNode {
    return (
      <div style={infoPagesStyle.wrapperStyle}>
        <h1 style={infoPagesStyle.h1Style}>Ochrana osobních údajů chalupa ŠVÝCARKA</h1>
        <h2 style={infoPagesStyle.h2StyleBoldUnderlined}>Prohlášení o ochraně osobních údajů</h2>
        <p style={infoPagesStyle.paragraphStyle}>
        Majitel chalupy ŠVÝCARKA a zřizovatel webu <SelfLink /> Martin Jiráský prohlašuje, že všechny osobní údaje jsou chráněny v souladu se zákonem č. 101/2000 Sb., o ochraně osobních údajů.
        </p>
        <h2 style={infoPagesStyle.h2StyleBold}>Zabezpečení osobních údajů</h2>
        <p style={infoPagesStyle.paragraphStyle}>
        <SelfLink /> je povinna zabezpečit ochranu vašich osobních údajů. Pro ochranu vašich osobních údajů používáme požadované bezpečnostní prostředky a postupy před neoprávněným přístupem, používáním a dalším nakládáním s těmito záznamy. Po zadání vašich údajů do našeho systému se zavazujeme k nakládání s těmito údaji pouze pro komunikaci mezi vaší osobou a námi. <SelfLink /> žádným způsobem neposkytne záznamy třetí osobě pokud nedostaneme váš souhlas nebo pokud zákon nebude vyžadovat jinak, nebudeme sdílet vaše osobní data, která nám poskytnete online.
        </p>
        <h2 style={infoPagesStyle.h2StyleBold}>Kde jsou vyžadovány osobní údaje</h2>
        <p style={infoPagesStyle.paragraphStyle}>
        <SelfLink /> na svých webových stránkách zveřejňuje informace o objektu, službách, které nabízíme a kontaktních údaje.Ty základní informace jsou veřejné a dostupné všem návštěvníkům webových stránek bez potřeby zadávání vlastních osobních údajů. Rozdíl je při tvorbě poptávkového formuláře, který slouží při poptání ubytovacích služeb v tomto objektu. V tento okamžik je zapotřebí vyplnit základní osobní údaje (jméno, adresu trvalého bydliště, e-mail, telefon), díky kterým budou uloženy v našem rezervačním systému přes který s nimi budeme komunikovat. V případě potřeby vás budeme kontaktovat osobně. Záznamy jsou bezpečně uloženy u poskytovatele webhostingu v databázi na dobu nejméně 3 let, nebo do doby než náš host zažádá prostřednictvím e-mailu o vymazání z databáze hostů. Zadání dat je nezbytné pro vytvoření rezervace pronájmu chalupy, samozřejmě je možné rezervovat chalupu i osobně, bez vyplňování formuláře. V této situaci vaše záznamy nijak neukládáme. Uložené záznamy o vaší osobě je možné na základě zaslané žádosti o smazání (na info@svycarka.com) odstranit z naší databáze.
        </p>
        <h2 style={infoPagesStyle.h2StyleBold}>Údaje, které shromažďujeme</h2>
        <p style={infoPagesStyle.paragraphStyle}>
        <SelfLink /> provozuje webové stránky na kterých lze poptat nabízené ubytovací služby. Osobní údaje, které shromažďujeme v naší databázi jsou jméno, adresa trvalého bydliště, e-mailová adresa a telefon. <SelfLink /> <b>nevyužívá žádné</b> technologie personalizovaného retargetingu RTB.
        </p>                
        <h2 style={infoPagesStyle.h2StyleBold}>Proč tyto údaje shromažďujeme</h2>
        <p style={infoPagesStyle.paragraphStyle}>
        <SelfLink /> se zavazuje ke shromažďování a používání vašich osobních údajů po vašem odsouhlasení. Smíme využívat vaše údaje pro účely související s poskytováním služeb vaší osobě, což zahrnuje zpracování poptávky, poskytování služby, případně informací, které žádáte či odpovědí na vaše stížnosti nebo dotazy.
        </p>
        <h2 style={infoPagesStyle.h2StyleBold}>Souhlas s poskytnutím osobních údajů</h2>
        <p style={infoPagesStyle.paragraphStyle}>
        <SelfLink /> získává váše svolení se zahrnutí poskytnutých údajů do databáze společnosti a s jejich nakládáním spojených s poskytováním služeb (pronájem ubytovacích prostor). V případě, že se rozhodnete poskytnout nám osobní údaje (jakékoliv informace, podle kterých lze identifikovat vaši osobu), buďte si jisti, že budou využity pouze k vytvoření rezervace v nabízením objektu a další vzájemné komunikaci během poskytování nabízených služeb.
        </p>                                
      </div>
    );
  }
}

function SelfLink(): b.IBobrilNode {
    return <a href={selfUrl}>www.svycarka.com</a>;
}


export const gdprPage = b.component(GdprPage); 