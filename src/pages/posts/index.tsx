import type { GetStaticPropsContext, NextPageContext } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@/components/Header";

interface Files {
  [path: string]: string;
}

interface FileMetadata {
  [key: string]: any;
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const fileEntries = fs.readdirSync("./posts", { withFileTypes: true });
  const files = fileEntries
    .map((file) => {
      const source = fs.readFileSync(path.join("./posts", file.name), "utf-8");
      const { data, content } = matter(source);
      return { [file.name]: JSON.stringify(data) };
    })
    .reduce((prev, current) => ({ ...prev, ...current }));

  return {
    props: {
      files,
    },
  };
}

const PostEntry = ({ file, meta }: { file: string; meta: FileMetadata }) => {
  const router = useRouter();

  return (
    <div className="text-start">
      <a
        className="font-bold text-lg underline cursor-pointer"
        onClick={(e) => router.push(`/posts/${meta.slug}`)}
      >
        {meta.title}
      </a>
      {meta.date !== undefined ? (
        <h3>
          date: {" "}
          {new Date(meta.date).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h3>
      ) : (
        <></>
      )}
      {meta.author !== undefined ? (
        <h3>author: {meta.author}</h3>
      ) : (
        <></>
      )}
      {meta.tags !== undefined ? (
        <h3>tags: {meta.tags.join(", ")}</h3>
      ) : (
        <></>
      )}
      {meta.intro !== undefined ? (
        <h3>intro: {meta.intro}</h3>
      ) : (
        <></>
      )}
      

    </div>
  );
};

export default function PostListing({ files }: { files: Files }) {
  return (
    <main className="flex flex-col h-full select-text bg-amber-400 cursor-text font-serif overflow-scroll disable-r95">
      <Header />
      <div className="flex justify-center text-center items-center w-full p-4">
        <div className="max-w-sm w-full">
          <div className="flex flex-col justify-start items-start space-y-4 pt-4">
            {Object.entries(files)
              .sort(
                ([_, am], [__, bm]) =>
                  new Date(JSON.parse(bm).date ?? 0).valueOf() -
                  new Date(JSON.parse(am).date ?? 0).valueOf()
              )
              .map(([file, meta]) => (
                <PostEntry
                  key={file}
                  file={file}
                  meta={JSON.parse(meta) as FileMetadata}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
