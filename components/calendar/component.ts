import { observable } from "bobx";
import * as b from "bobril";
import { IMonthInfo, getMonthInfo, getPreviousMonthInfo, getNextMonthInfo, DayOfWeek, translateDay } from "../../utils/dateUtils";
import * as styles from "./styles"

class MonthDay {
    constructor(text: string, day: DayOfWeek) {
        this.text = text;
        this.day = day; 
    }

    text: string;
    day: DayOfWeek;
}

class CalendarComponent extends b.Component<ICalendarData> {
    @observable.ref
    protected _previousMonth: IMonthInfo; 
    @observable.ref
    protected _currentMonth: IMonthInfo;
    @observable.ref
    protected _nextMonth: IMonthInfo;
    @observable.ref
    protected _monthDays: MonthDay[];

    protected readonly _days: DayOfWeek[]
    protected readonly _startDay: DayOfWeek;

    constructor(data: ICalendarData) {
        super(data);
        
        this._currentMonth = getMonthInfo(data.referencedDate);
        this._previousMonth = getPreviousMonthInfo(this._currentMonth);
        this._nextMonth = getNextMonthInfo(this._currentMonth);


        this._startDay = data.startDay || DayOfWeek.monday;
        this._days = [];
        for(let i = 0, x = this._startDay; i < 7; i++) {
            this._days.push((x++) % 7);
        }

        this.initMonthDays();
        
        window["calender"] = this;
    }

    render(data: ICalendarData): b.IBobrilNode {
        const me: b.IBobrilNode = {
            tag: "div"
        };

        me.children= [
            this.dayHeader(),
            this.dayRows()
        ];

        b.style(me, styles.wrapperStyle);
        return me;
    }

    protected goToNextMonth(): void {
        this._previousMonth = this._currentMonth;
        this._currentMonth = this._nextMonth;
        this._nextMonth = getNextMonthInfo(this._currentMonth);
        this.initMonthDays();
    }

    protected goToPreviousMoth(): void {
        
        this._nextMonth = this._currentMonth;
        this._currentMonth = this._previousMonth;
        this._previousMonth = getPreviousMonthInfo(this._currentMonth);
        this.initMonthDays();
    }

    protected initMonthDays() {
        this._monthDays = [];
        let day = this._startDay;

        const prevDays = Math.abs(this._startDay - this._currentMonth.startDay);
        for(let i = this._previousMonth.daysCount - prevDays + 1; i <= this._previousMonth.daysCount; i++) {
            this._monthDays.push(new MonthDay(i.toString(), day));
            day = (day + 1) % 7;    
        }    

        for(let i = 1; i <= this._currentMonth.daysCount; i++) {
            this._monthDays.push(new MonthDay(i.toString(), day));
            
            if(i === this._currentMonth.daysCount) {
                continue;
            }
            day = (day + 1) % 7;    
        }   

        const nextDays = 6 - Math.abs(day - this._startDay);
        for(let i = 1; i <= nextDays; i++) {
            this._monthDays.push(new MonthDay(i.toString(), day));
            day = (day + 1) % 7;    
        }
    }

    dayHeader(): b.IBobrilChild {
        return b.styledDiv(this._days.map(day => b.styledDiv(translateDay(day), styles.columnStyle)), styles.dayLine);
    }

    dayRows(): b.IBobrilChildren {
        let children: b.IBobrilChildren = [];

        let line: b.IBobrilChildren = [];

        for(let i = 0; i < this._monthDays.length; i++) {
            line.push(b.styledDiv(this._monthDays[i].text, styles.columnStyle));
            if(line.length !== 7) {
                continue;
            }

            children.push(b.styledDiv(line, styles.rowStyle));
            line = [];
        }

        return children;
    }

    onClick(): boolean {
        this.goToNextMonth();
        return true;
    }
}

export interface ICalendarData {
    startDay?: DayOfWeek;
    referencedDate?: Date;
}

export const calendar = b.component(CalendarComponent);