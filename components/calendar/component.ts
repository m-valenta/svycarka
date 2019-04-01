import { observable } from "bobx";
import * as b from "bobril";
import { IMonthInfo, getMonthInfo, getPreviousMonthInfo, getNextMonthInfo, DayOfWeek, translateDay, translateMonth } from "../../utils/dateUtils";
import * as styles from "./styles"

class MonthDay {

    constructor(text: string, day: DayOfWeek, isInCurrentMonth: boolean, isReserved: boolean) {
        this.text = text;
        this.day = day; 
        this.isInCurrentMonth = isInCurrentMonth;
        this.isReserved = isReserved;
    }

    readonly text: string;
    readonly day: DayOfWeek;
    readonly isInCurrentMonth: boolean;
    readonly isReserved: boolean;
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

    render(): b.IBobrilNode {
        const me: b.IBobrilNode = {
            tag: "div"
        };

        me.children= [
            calendarHeader(this),
            this.dayHeader(),
            this.dayRows()
        ];

        b.style(me, styles.wrapperStyle);
        return me;
    }

    goToNextMonth(): void {
        this._previousMonth = this._currentMonth;
        this._currentMonth = this._nextMonth;
        this._nextMonth = getNextMonthInfo(this._currentMonth);
        this.initMonthDays();
    }

    goToPreviousMoth(): void {
        
        this._nextMonth = this._currentMonth;
        this._currentMonth = this._previousMonth;
        this._previousMonth = getPreviousMonthInfo(this._currentMonth);
        this.initMonthDays();
    }

    get currentMonth(): IMonthInfo {
        return this._currentMonth;
    }

    protected initMonthDays() {
        this._monthDays = [];
        let day = this._startDay;

        const prevDays = Math.abs(this._startDay - this._currentMonth.startDay);
        for(let i = this._previousMonth.daysCount - prevDays + 1; i <= this._previousMonth.daysCount; i++) {
            this._monthDays.push(new MonthDay(i.toString(), day, false, false));
            day = (day + 1) % 7;    
        }    

        for(let i = 1; i <= this._currentMonth.daysCount; i++) {
            this._monthDays.push(new MonthDay(i.toString(), day, true, false));
            
            if(i === this._currentMonth.daysCount) {
                continue;
            }
            day = (day + 1) % 7;    
        }   

        const nextDays = 6 - Math.abs(day - this._startDay);
        for(let i = 1; i <= nextDays; i++) {
            this._monthDays.push(new MonthDay(i.toString(), day, false, false));
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
            const currentDay = this._monthDays[i];
            line.push(b.styledDiv(currentDay.text, this.getDayStyle(currentDay)));
            if(line.length !== 7) {
                continue;
            }

            children.push(b.styledDiv(line, styles.rowStyle));
            line = [];
        }

        return children;
    }

    getDayStyle(day: MonthDay): b.IBobrilStyle[] {
        var style = [ styles.columnStyle ];
        !day.isInCurrentMonth && style.push(styles.columnStyleOtherMonth);
        day.isReserved && style.push(styles.columnStyleReserved);

        return style;
    }

    onClick(): boolean {
        this.goToNextMonth();
        return true;
    }
}

class CalendarHeader extends b.Component<ICalendarHeaderData> {
    render(data: ICalendarHeaderData): b.IBobrilNode {
        const me: b.IBobrilNode = {
            tag: "div"
        };

        me.children= [
            this.leftButton(),
            this.month(),
            this.rightButton(),
            b.styledDiv(null, { clear: "both"})
        ];

        b.style(me, {
            margin: "0 auto 5px auto"
        });
        return me;
    }

    protected month(): b.IBobrilNode {
        return b.styledDiv(translateMonth(this.data.currentMonth.month), {
            cssFloat: "left",
            textAlign: "center",
            width: "26.8%"
        });
    }

    protected leftButton(): b.IBobrilNode {
        return b.style(this.button(() => this.data.goToPreviousMoth()), {
            backgroundColor: "red",
            width: 25,
            height: 25,
            cssFloat: "left"
        });
    }

    protected rightButton(): b.IBobrilNode {
        return b.style(this.button(() => this.data.goToNextMonth()), {
            backgroundColor: "green",
            width: 25,
            height: 25,
            cssFloat: "left"
        });
    }

    protected button(action: () =>void): b.IBobrilNode {
        return {
            tag: "div",
            component: {
                onClick() {
                    action();
                    return true;
                }
            }
        };
    }
}

interface ICalendarHeaderData {
    goToNextMonth(): void;
    goToPreviousMoth(): void;
    currentMonth: IMonthInfo;
}

export interface ICalendarData {
    startDay?: DayOfWeek;
    referencedDate?: Date;
}

const calendarHeader = b.component(CalendarHeader);
export const calendar = b.component(CalendarComponent);1