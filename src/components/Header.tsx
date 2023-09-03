import Image from 'next/image';

import { useRouter } from 'next/router'
import { HTMLProps, MouseEventHandler } from 'react';
 
function ActiveLink({ children, href }: HTMLProps<HTMLAnchorElement>) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    fontWeight: router.asPath === href ? "bold" : "normal"
  }
 
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    router.push(href ?? "/");
  }
 
  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default function Header() {
  return (
    <header className="flex flex-col text-center items-center border-b-2 border-black w-full font-serif pb-2 px-4">
      welcome to the
      <Image
        src="/logo.gif"
        alt="An animated flaming logo that says harrison zone"
        width={456}
        height={113}
      />
      site reliability engineer, public transportation enthusiast, autism haver, blahaj owner
      <br />
      <div className="flex pt-2">
        <ActiveLink href="/">home</ActiveLink>
        <ActiveLink href="/posts">posts</ActiveLink>
      </div>
    </header>
  )
}