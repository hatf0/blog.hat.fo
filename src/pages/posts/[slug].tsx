import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Image from 'next/image';
import { ReactNode } from "react";

export async function getStaticPaths() {
  const files = fs.readdirSync("./posts");

  return {
    paths: files.map((file) => ({
      params: {
        slug: path.parse(file).name,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { slug } = ctx.params!;

  const source = fs.readFileSync(
    path.join("./posts", (slug + ".mdx") as string),
    "utf-8"
  );

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: JSON.parse(JSON.stringify(data)),
  });


  return {
    props: {
      source: mdxSource,
      frontMatter: JSON.parse(JSON.stringify(data)),
    },
  };
}

const components = {
  h1: ({children, ...props}: {children?: ReactNode}) => (
    <h1 className='font-bold text-lg' {...props}>{children}</h1>
  ),
  h2: ({children, ...props}: {children?: ReactNode}) => (
    <h2 className='font-bold text-md' {...props}>{children}</h2>
  ),
  a: ({children, ...props}: {children?: ReactNode}) => (
    <a className='text-blue-800 underline cursor-grab' {...props}>{children}</a>
  )
}

export default function Page({
  source,
  frontMatter
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='flex flex-col w-full h-full cursor-text select-text items-center bg-amber-400 space-y-4 overflow-scroll'>
      <div className="flex flex-col text-center items-center border-b-2 border-black w-full font-serif">
        welcome to the
        <Image
          src="/logo.gif"
          alt="An animated flaming logo that says harrison zone"
          width={456}
          height={113}
        />
      </div>
      <main className='max-w-lg font-sans'>
        <MDXRemote {...source} components={components} />
      </main>
    </div>
  );
}
