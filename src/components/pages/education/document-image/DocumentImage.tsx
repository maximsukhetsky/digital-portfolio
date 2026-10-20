import Image from "next/image";
import classNames from "classnames/bind";
import type { ScannedDocument } from "@/lib/education/types";
import styles from "./DocumentImage.module.scss";

const cn = classNames.bind(styles);

type DocumentImageProps = ScannedDocument & {
  alt: string;
};

export default function DocumentImage({ image, url, alt }: DocumentImageProps) {
  return (
    <a
      href={url ?? image.src}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("document-image")}
    >
      <Image
        src={image}
        sizes="(min-width: 648px) 600px, 100vw"
        className={cn("image")}
        alt={alt}
      />
    </a>
  );
}
