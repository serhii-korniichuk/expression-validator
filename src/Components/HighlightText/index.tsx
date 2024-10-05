import classNames from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";

export type HighlightProps = {
  highlightIndex?: number;
};

type Props = HighlightProps & {
  className?: string;
  children?: string;
};

const getTextPartsWithHighlight = (text: string, index: number) => {
  const beforeHighlight = text.slice(0, index);
  const highlight = text.slice(index, index + 1);
  const afterHighlight = text.slice(index + 1);
  return { beforeHighlight, highlight, afterHighlight };
};

export const HighlightText: FC<Props> = ({
  className,
  children = "",
  highlightIndex,
}) => {
  if (typeof highlightIndex !== "number") {
    return (
      <span className={classNames(styles.container, className)}>
        {children}
      </span>
    );
  }

  const { beforeHighlight, highlight, afterHighlight } =
    getTextPartsWithHighlight(children, highlightIndex);

  return (
    <span className={classNames(styles.container, className)}>
      {beforeHighlight}
      {highlight && <span className={styles.pointer}>{highlight}</span>}
      {afterHighlight}
    </span>
  );
};
