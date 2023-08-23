import Image from 'next/image'
import { AnimatedBadge, Badge, BigAnimatedBadge, BigBadge } from '@/components/Badges'

export default function Home() {
  return (
    <main className='flex flex-col h-full select-text bg-amber-400 cursor-text font-serif'>
      <div className='flex flex-col text-center items-center border-b-2 border-black'>
        welcome to the
        <Image src='/logo.gif' alt='An animated flaming logo that says harrison zone' width={456} height={113} />
      </div>
      <div className='text-center pt-2 border-b-2 border-black pb-2'>
        <p>hello i am harrison (they/them) and this is my</p>
        <p className='font-bold'>blog</p>
        <p>i am a trans anarchist site reliability engineer working somewhere working on Things That People Use</p>
        <p>thoughts and opinions are all my own here and do not represent any views held by my employers</p>
      </div>
      <div className='flex text-center items-center justify-center mt-2'>
        <AnimatedBadge badge='best_viewed' />
        <AnimatedBadge badge='eff2' />
        <AnimatedBadge badge='fl_jap' />
        <AnimatedBadge badge='fl_usa2' />
        <AnimatedBadge badge='gmail_copy1' />
        <Badge badge='Hhacker' />
        <AnimatedBadge badge='mac_micro' />
        <Badge badge='andro' />
      </div>
      <div className='flex text-center items-center justify-center'>
        <BigAnimatedBadge badge='acab' />
        <BigAnimatedBadge badge='anarchynow' />
        <BigBadge badge='queer' />
        <BigBadge badge='nonbinary' />
        <BigAnimatedBadge badge='this_website_gay' />
        <BigAnimatedBadge badge='defund_badge' />
        <BigAnimatedBadge badge='macosmade' />
        <BigAnimatedBadge badge='webpassion' />
      </div>
    </main>


  )
}
