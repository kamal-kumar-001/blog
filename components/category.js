import Link from "next/link";

export default function CategoryLabel({ categories }) {
  return (
    <div>
      {/* {categories?.length && categories.slice(0).map((category, index) => ( */}
          <Link
            href={"/"}
           >
              {/* <Label color={category.color}>{category.title}</Label> */}
              <span className="inline-block mt-5 text-xs font-medium tracking-wider uppercase ">
              {/* {categories ? categories.name : 'unknown'} */}
              {categories.name}
              </span>
          </Link>
        {/* ))} */}
    </div>
  );
}
