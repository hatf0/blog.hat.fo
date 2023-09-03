import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Image from 'next/image';
import { HTMLProps, ReactNode, useEffect, useRef } from "react";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github/lib";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import { useRouter } from "next/router";
import rehypeSlug from "rehype-slug";
import Header from "@/components/Header";

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
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkToc
      ],
      rehypePlugins: [
        rehypeSlug
      ],
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
    <h1 className='font-bold text-3xl py-2' {...props}>{children}</h1>
  ),
  h2: ({children, ...props}: {children?: ReactNode}) => (
    <h2 className='font-bold text-xl py-2' {...props}>{children}</h2>
  ),
  h3: ({children, ...props}: {children?: ReactNode}) => (
    <h2 className='text-lg' {...props}>{children}</h2>
  ),
  a: ({children, href, ...props}: {children?: ReactNode} & HTMLProps<HTMLAnchorElement>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    if (href?.startsWith('#')) {
      return (
        <a className='text-blue-800 underline cursor-grab' onClick={(e) => router.push({ hash: href })} {...props}>{children}</a>
      )
    } else {
      return (
        <a className='text-blue-800 underline cursor-grab' href={href} {...props}>{children}</a>
      );
    }
  },
  ul: ({children, ...props}: {children?: ReactNode}) => (
    <ul className='list-decimal [&>*]:ml-4' {...props}>{children}</ul>
  ),
  li: ({children, ...props}: {children?: ReactNode}) => (
    <li className='list-decimal' {...props}>{children}</li>
  ), 
  Image
}

export default function Page({
  source,
  frontMatter
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const content = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!content.current) return;

    console.log(window.location);
    if (window.location.hash === "") {
      console.log('scrolling to top');
      content.current.scrollTo({ top: 0 });
      return;
    }

    let item = content.current?.querySelector(window.location.hash);
    if (item) {
      item.scrollIntoView();
    }
  }, [content, router.asPath]);

  return (
    <main className='flex flex-col w-full h-full cursor-text select-text items-center bg-amber-400 overflow-scroll overscroll-contain space-y-4 pb-8' ref={content}>
      <Header />
      <article className='max-w-lg font-sans px-4'>
        <MDXRemote {...source} components={components} />
      </article>
    </main>
  );
}
