declare module 'pdf-annotate.js' {
    export const UI: {
        enableEdit: () => void;
        enableText: () => void;
        enablePen: () => void;
        enableDraw: () => void;
        createPage: (container: HTMLElement, width: number, height: number) => void;
        setText: (color: string) => void;
        setHighlight: (color: string) => void;
        setPen: (color: string) => void;
    };
} 