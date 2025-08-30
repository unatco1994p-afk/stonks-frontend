import { ComponentRef, Injectable, Type, ViewContainerRef } from "@angular/core";
import { AbstractWindow } from "./abstract-window.component";
import { BehaviorSubject } from "rxjs";

export interface WindowEntry {
    id: number;
    ref: ComponentRef<AbstractWindow>;
    zIndex: number;
    active: boolean;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class WindowRegisterService {
    private windowSound = new Audio('assets/sounds/window.wav');

    private windows: WindowEntry[] = [];
    private idCounter = 0;
    private baseZIndex = 100;

    private windows$ = new BehaviorSubject<WindowEntry[]>([]);
    windowsChanges$ = this.windows$.asObservable();

    private viewContainer!: ViewContainerRef;

    private mouseX = window.innerWidth / 2;
    private mouseY = window.innerHeight / 2;

    constructor() {
        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    setViewContainer(viewContainer: ViewContainerRef) {
        this.viewContainer = viewContainer;
    }

    registerWindow(windowType: Type<AbstractWindow>, singleton: boolean = false, inputs: {[key: string]: any} = {}): WindowEntry {     
        if (singleton) {
            const existing = this.windows.find(w => w.ref.instance instanceof windowType);
            if (existing) {
                this.setActive(existing);
                this.playWindow();
                return existing;
            }
        }
        
        const ref = this.viewContainer.createComponent(windowType);

        const entry: WindowEntry = {
            id: ++this.idCounter,
            ref,
            zIndex: this.baseZIndex + this.windows.length,
            active: false,
            name: ref.instance.windowName
        };

        this.windows.push(entry);

        this.setActive(entry);

        Object.entries(inputs).forEach(([key, value]) => {
            ref.setInput(key, value);
        });

        let x = this.mouseX;
        let y = this.mouseY;
        if (x > window.innerWidth * 0.5) {
            x = window.innerWidth * 0.45;
        }
        if (y > window.innerHeight * 0.5) {
            y = window.innerHeight * 0.35;
        }
        ref.setInput('x', x);
        ref.setInput('y', y);

        ref.instance.close.subscribe(() => this.closeWindow(entry));
        ref.instance.focus.subscribe(() => {
            console.log('setActive');
            this.setActive(entry);
        });

        this.emitChanges();

        this.playWindow();

        return entry;
    }

    setActive(entry: WindowEntry) {
        this.windows.forEach(w => w.active = false);
        entry.active = true;

        // przesunięcie na wierzch
        const maxZ = Math.max(...this.windows.map(w => w.zIndex), this.baseZIndex);
        entry.zIndex = maxZ + 1;
        entry.ref.instance.zIndex = entry.zIndex;
    }

    closeWindow(entry: WindowEntry) {
        const idx = this.windows.indexOf(entry);
        if (idx >= 0) {
            this.windows.splice(idx, 1);
        }
        entry.ref.destroy();

        // ustaw inne aktywne jeśli zostały
        if (this.windows.length > 0) {
            this.setActive(this.windows[this.windows.length - 1]);
        }

        this.emitChanges();
    }

    closeAll() {
        this.windows.forEach(w => w.ref.destroy());
        this.windows = [];

        this.emitChanges();
    }

    getWindows() {
        return this.windows;
    }

    getActiveWindow(): WindowEntry | undefined {
        return this.windows.find(w => w.active);
    }

    private emitChanges() {
        this.windows$.next([...this.windows]); // kopia, żeby Angular ładnie wykrywał zmiany
    }

    private playWindow() {
        this.windowSound.currentTime = 0;
        this.windowSound.volume = 0.5;
        this.windowSound.play();
    }
}
