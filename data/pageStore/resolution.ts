import { IResolution } from "./types";
import { observable } from "bobx";
import { IDisposable } from "bobril";
import { fullWidth } from "../../constants";

export class ResolutionStore implements IResolution, IDisposable {
    
    constructor() {
        this.UpdateDelegate = () => {
            this._width = document.body.clientWidth;
            this._height = document.body.clientHeight;
            this._windowWidth = window.innerWidth; 
            this._windowHeight = window.innerHeight;
            this._isMobile = this._width < fullWidth;
        }

        this.UpdateDelegate();
    }

    private isInitialized: boolean = false;

    private readonly UpdateDelegate: () => void;

    @observable
    private _width: number = 0;
    
    @observable
    private _height: number = 0;
    
    @observable
    private _windowWidth: number = 0;
    
    @observable
    private _windowHeight: number = 0;
    
    @observable
    private _isMobile: boolean = false;

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get windowWidth(): number {
        return this._windowWidth;
    }

    get windowHeight(): number {
        return this._windowHeight;
    }

    get isMobile(): boolean {
        return this._isMobile;
    }

    public init() {
        if(this.isInitialized)
            return;
        
        this.isInitialized = true;
        window.addEventListener("resize", this.UpdateDelegate);
    }

    dispose(): void {
        this.isInitialized && window.removeEventListener("resize", this.UpdateDelegate);
    }
}