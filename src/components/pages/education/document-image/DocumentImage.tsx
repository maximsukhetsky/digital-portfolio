import Image from "next/image";
import classNames from "classnames/bind";
import type { ScannedDocument } from "@/lib/education/types";
import styles from "./DocumentImage.module.scss";

const cn = classNames.bind(styles);

type DocumentImageProps = ScannedDocument & {
  imageClassName?: string;
  alt: string;
};

export default function DocumentImage({ image, url, imageClassName, alt }: DocumentImageProps) {
  return (
    <a
      href={url ?? image.src}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("document-image")}
    >
      <Image
        src={image}
        sizes="(min-width: 1024px) 800px, 100vw"
        className={cn("image", imageClassName)}
        alt={alt}
      />
    </a>
  );
}
