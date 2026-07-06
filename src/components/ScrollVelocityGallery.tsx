import { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";

interface Props {
  images: string[];
  baseVelocity?: number;
}

function Row({ images, baseVelocity = 3 }: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const loop = [...images, ...images, ...images, ...images];

  return (
    <div dir="ltr" className="overflow-hidden m-0 whitespace-nowrap flex-nowrap">
      <motion.div className="flex gap-3 sm:gap-6 flex-nowrap whitespace-nowrap" style={{ x }}>
        {loop.map((src, i) => (
          <div key={i} className="shrink-0 w-[160px] sm:w-[280px] md:w-[360px] aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/20 bg-card/40 grid place-items-center">
            <img src={src} alt="Glow diary" loading="lazy" className="h-full w-full object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocityGallery({ images }: { images: string[] }) {
  const half = Math.ceil(images.length / 2);
  return (
    <div className="space-y-3 sm:space-y-6">
      <Row images={images.slice(0, half)} baseVelocity={5} />
      <Row images={images.slice(half).concat(images.slice(0, half))} baseVelocity={-5} />
    </div>
  );
}

