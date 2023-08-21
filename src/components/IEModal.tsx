import { TaskBar, List, Frame, Button, Input } from '@react95/core'
import {
  ArrowLeft, ArrowRight, Circle, Mshtml32536, Progman44, Progman45
} from '@react95/icons';
import { useContext, useState, useEffect } from 'react';
import { WindowContext } from './WindowContext';
import styled from 'styled-components';
import { useRouter } from 'next/router';

type IEModalProps = React.HTMLAttributes<HTMLDivElement>

const StyledFrame = styled(Frame)`
  &&& {
    width: 100%;
    height: 100%;
  }
`

const IEModal = ({children}: IEModalProps) => {
  const windowCtx = useContext(WindowContext);
  const router = useRouter();
  const [path, setPath] = useState(router.route);

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setPath(evt.currentTarget.value);
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: any) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: any) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
        router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <>
      <Frame className='w-full' boxShadow='out'>
        <div className="flex">
          <Button className="flex flex-col" onClick={() => window.history.back()}>
            <ArrowLeft variant='32x32_4' />
            Back
          </Button>

          <Button className="flex flex-col" onClick={() => window.history.forward()}>
            <ArrowRight variant='32x32_4' />
            Forward
          </Button>
          <Button className="flex flex-col" onClick={() => router.push('/')}>
            <Mshtml32536 />
            Home
          </Button>
        </div>
      </Frame>
      <Frame className='flex w-full'>
        <Frame className='p-1'>
          Address
        </Frame>
        <StyledFrame className='flex p-[2px]'>
          <Input className='w-full' value={path} onChange={handleChange} onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            console.log(e);
            if (e.key === 'Enter') {
              router.push(path);
            }
          }} />
        </StyledFrame>
        <Frame className='flex items-center justify-center'>
          { loading ? <Circle variant='16x16_4' className='animate-spin'/> : <Circle variant='16x16_4' /> }
        </Frame>
      </Frame>
      <StyledFrame className='w-full h-full' boxShadow='out' padding={4}>
        <StyledFrame className='w-full h-full' boxShadow='in'>
          <div className='w-full h-full bg-white'>
            {children}
          </div>
        </StyledFrame>
      </StyledFrame>
    </>
  );
};

export default IEModal;