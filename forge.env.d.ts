/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

declare module "*.ogg?asset" {
  const src: string;
  export default src;
}

declare module "*.mp3?asset" {
  const src: string;
  export default src;
}
