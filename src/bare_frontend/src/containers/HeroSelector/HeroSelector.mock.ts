import {
  heroAvatar1,
  heroAvatar2,
  heroAvatar3,
  heroAvatar4,
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
} from './assets';

type Hero = {
  id: number;
  avatar: string;
  image: string;
};

export const nftHeroes: Hero[] = [
  {
    id: 1,
    avatar: heroAvatar1,
    image: heroImage1,
  },
  {
    id: 2,
    avatar: heroAvatar2,
    image: heroImage2,
  },
  {
    id: 3,
    avatar: heroAvatar3,
    image: heroImage3,
  },
  {
    id: 4,
    avatar: heroAvatar4,
    image: heroImage4,
  },
];
