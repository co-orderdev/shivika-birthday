export type ImageAsset = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  position?: string;
};

export type VideoAsset = {
  id: string;
  src: string;
  title: string;
  caption: string;
  poster?: string;
};

export const heroImages: ImageAsset[] = [
  {
    id: "hero-1",
    src: "images/hero-1.jpg",
    alt: "Shivika smiling",
    title: "👑 CHOTA DON",
    caption: "A little smile that makes every room brighter.",
    position: "center"
  },
  {
    id: "hero-2",
    src: "images/hero-2.jpg",
    alt: "Shivika enjoying a happy moment",
    title: "Tiny adventures",
    caption: "Two years of discovering the world with wonder.",
    position: "center"
  },
  {
    id: "hero-3",
    src: "images/hero-3.jpg",
    alt: "Shivika surrounded by family love",
    title: "Loved beyond words",
    caption: "Our favorite little reason to celebrate.",
    position: "center"
  }
];

export const carouselImages: ImageAsset[] = [
  {
    id: "shivika-01",
    src: "images/carousel-1.jpg",
    alt: "Shivika memory one",
    title: "Little Smile",
    caption: "A smile worth remembering.",
    position: "center"
  },
  {
    id: "shivika-02",
    src: "images/carousel-2.jpg",
    alt: "Shivika memory two",
    title: "Curious Eyes",
    caption: "Always looking at the world with wonder.",
    position: "center"
  },
  {
    id: "shivika-03",
    src: "images/carousel-3.jpg",
    alt: "Shivika memory three",
    title: "Tiny Steps",
    caption: "Every little step became a big celebration.",
    position: "center"
  },
  {
    id: "shivika-04",
    src: "images/carousel-4.jpg",
    alt: "Shivika memory four",
    title: "Pure Joy",
    caption: "The kind of joy only Shivika can bring.",
    position: "center"
  },
  {
    id: "shivika-05",
    src: "images/carousel-5.jpg",
    alt: "Shivika memory five",
    title: "Sweet Wonder",
    caption: "A world full of beautiful little discoveries.",
    position: "center"
  },
  {
    id: "shivika-06",
    src: "images/carousel-6.jpg",
    alt: "Shivika memory six",
    title: "Family Days",
    caption: "The best days are the ones spent together.",
    position: "center"
  },
  {
    id: "shivika-07",
    src: "images/carousel-7.jpg",
    alt: "Shivika memory seven",
    title: "Little Spark",
    caption: "Small hands, enormous personality.",
    position: "center"
  },
  {
    id: "shivika-08",
    src: "images/carousel-8.jpg",
    alt: "Shivika memory eight",
    title: "Golden Hour",
    caption: "A golden memory from a golden little life.",
    position: "center"
  },
  {
    id: "shivika-09",
    src: "images/carousel-9.jpg",
    alt: "Shivika memory nine",
    title: "Always Loved",
    caption: "Surrounded by more love than she can imagine.",
    position: "center"
  },
  {
    id: "shivika-10",
    src: "images/carousel-10.jpg",
    alt: "Shivika memory ten",
    title: "Growing Bright",
    caption: "Here is to everything beautiful still to come.",
    position: "center"
  }
];

export const galleryImages: ImageAsset[] = [
  {
    id: "gallery-1",
    src: "images/gallery-1.jpg",
    alt: "Shivika gallery memory one",
    title: "ABHI TOH MAZE MAI HU😇",
    caption: "HOLI"
  },
  {
    id: "gallery-2",
    src: "images/gallery-2.jpg",
    alt: "Shivika gallery memory two",
    title: "ABHI KUCH SOCH RAHI HU🧐",
    caption: "ACTUALLY CARTOON PAR DHYAN HAI."
  },
  {
    id: "gallery-3",
    src: "images/gallery-3.jpg",
    alt: "Shivika gallery memory three",
    title: "PHOTO TIME🫩",
    caption: "."
  },
  {
    id: "gallery-4",
    src: "images/gallery-4.jpg",
    alt: "Shivika gallery memory four",
    title: "YE LAST PHOTO HA!!",
    caption: "ISKE BAAD CLICK NHI KARWAUNGI😏."
  },
  {
    id: "gallery-5",
    src: "images/gallery-5.jpg",
    alt: "Shivika gallery memory five",
    title: "KITNI PHOTOS CLICK KARTE HO!!😡😤",
    caption: "(CHOOR DOO MUJHEE,MUMMAAAAAAA!!)."
  },
  {
    id: "gallery-6",
    src: "images/gallery-6.jpg",
    alt: "Shivika gallery memory six",
    title: "MOSI MANTI TOH HAI NAHI!",
    caption: "It's ok , last photo!🫶."
  }
];

export const videos: VideoAsset[] = [
  {
    id: "video-1",
    src: "videos/video-1.mp4",
    title: "TOWNNNNNNN🗣️",
    caption: "WHEELS ON THE BUS GO ROUND AND ROUND....",
    poster: "images/hero-1.jpg"
  },
  {
    id: "video-2",
    src: "videos/video-2.mp4",
    title: "Big laughter",
    caption: "The happiest sound in the house.",
    poster: "images/carousel-1.jpg"
  },
  {
    id: "video-3",
    src: "videos/video-3.mp4",
    title: "PARTYYYYY!!🎊",
    caption: "mamu's first birthday with shivika.",
    poster: "images/carousel-2.jpg"
  },
  {
    id: "video-4",
    src: "videos/video-4.mp4",
    title: "Little dancer",
    caption: "A little rhythm and a lot of joy.",
    poster: "images/carousel-3.jpg"
  },
  {
    id: "video-5",
    src: "videos/video-5.mp4",
    title: "Family time",
    caption: "MUMMA:GUSSA NHI..., SHIVIKA:AYYYEEEEE!.",
    poster: "images/carousel-4.jpg"
  },
  {
    id: "video-6",
    src: "videos/video-6.mp4",
    title: "That expression",
    caption: "A face full of personality.",
    poster: "images/carousel-5.jpg"
  },
  {
    id: "video-7",
    src: "videos/video-7.mp4",
    title: "SONA MAT!!😪",
    caption: "heheheheh😁.",
    poster: "images/carousel-6.jpg"
  },
  {
    id: "video-8",
    src: "videos/video-8.mp4",
    title: "cartoon with mama!🫠",
    caption: "Mama and Shivika together!",
    poster: "images/carousel-7.jpg"
  },
  {
    id: "video-9",
    src: "videos/video-9.mp4",
    title: "JOY TIME!!",
    caption: "The moments we wish we could keep forever.",
    poster: "images/carousel-8.jpg"
  },
  {
    id: "video-10",
    src: "videos/video-10.mp4",
    title: "one...two...three...GO!!",
    caption: "Small hands, big imagination.",
    poster: "images/carousel-9.jpg"
  },
  {
    id: "video-11",
    src: "videos/video-11.mp4",
    title: "stickersss , wow 😍",
    caption: "tatatatatatatat🗣️.",
    poster: "images/carousel-10.jpg"
  },
  {
    id: "video-12",
    src: "videos/video-12.mp4",
    title: "balloonnnn🎈",
    caption: "ye phut kyuu nhi raha!🤔",
    poster: "images/gallery-1.jpg"
  },
  {
    id: "video-13",
    src: "videos/video-13.mp4",
    title: "Birthday girl, mama's girl",
    caption: "",
    poster: "images/gallery-2.jpg"
  }
];

export const pixelMemoryImage = "images/pixel-memory.jpg";