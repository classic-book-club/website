import React from "react";

// style
import styles from "../../styles/Archive.module.scss";

// context
import { useCategoryState } from "../../context/categoryState";

const RightArrow = () => (
  <svg
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.380005 0.950195L8.44 5.6002L16.5 10.2602L8.44 14.9102L0.380005 19.5602"
      stroke="black"
      strokeWidth="0.44"
      strokeMiterlimit="10"
    />
  </svg>
);

const DetailBar = ({ categories }) => {
  const [catState, dispatchCats] = useCategoryState();
  const { parent, children: currentCats } = catState;

  const childCats = parent
    ? categories.filter(({ slug }) => slug === parent)
    : undefined;

  return (
    <>
      <div className={styles.cat}>
        <ul>
          {childCats ? (
            childCats[0]?.children.map(({ name, slug }) => (
              <li
                className={
                  currentCats.includes(slug) ? styles.select : styles.notSelect
                }
                onClick={() => {
                  dispatchCats({
                    type: "toggleChildCat",
                    payload: slug,
                  });
                }}
                key={`detailBar-${slug}`}
              >
                {name}
              </li>
            ))
          ) : (
            <li>{" { 所有文章 } "}</li>
          )}
        </ul>
      </div>
      <div className={styles.sort}>
        <label>sort by</label>
        <div className={styles.sort}>
          latest
          <RightArrow />
        </div>
      </div>
    </>
  );
};

export default DetailBar;
