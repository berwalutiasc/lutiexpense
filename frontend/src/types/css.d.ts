declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'swiper/css' {
  const content: any;
  export default content;
}

declare module 'swiper/css/autoplay' {
  const content: any;
  export default content;
} 