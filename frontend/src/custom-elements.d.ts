declare namespace JSX {
  interface IntrinsicElements {
    "l-helix": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      size?: string;
      speed?: string;
      color?: string;
    };
  }
}
