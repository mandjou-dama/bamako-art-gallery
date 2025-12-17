// Type declarations for importing CSS files
// Allows imports like `import './page.css'` or CSS modules `import styles from './page.module.css'`

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  // For side-effect imports and simple class name objects
  const content: { readonly [key: string]: string };
  export default content;
}

// Type declarations for importing image assets
// Allows imports like `import photo from '@/public/assets/photo.jpeg'`
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
