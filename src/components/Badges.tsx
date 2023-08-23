import Image from 'next/image'

export interface BadgeProps {
  badge: string;
}

export const Badge = ({badge}: BadgeProps) => (
  <Image
    src={`/badges/${badge}.png`}
    alt={`The ${badge} badge`}
    width={80}
    height={15}
  />
);

export const AnimatedBadge = ({badge}: BadgeProps) => (
  <Image
    src={`/badges/${badge}.gif`}
    alt={`The ${badge} animated badge`}
    width={80}
    height={15}
  />
);

export const BigBadge = ({badge}: BadgeProps) => (
  <Image
    src={`/badges/${badge}.png`}
    alt={`The ${badge} badge`}
    width={88}
    height={31}
  />
);

export const BigAnimatedBadge = ({badge}: BadgeProps) => (
  <Image
    src={`/badges/${badge}.gif`}
    alt={`The ${badge} badge`}
    width={88}
    height={31}
  />
);