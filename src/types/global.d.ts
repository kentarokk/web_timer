declare module "use-sound" {
  export default function useSound(sound: any, options?: any): any;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}
