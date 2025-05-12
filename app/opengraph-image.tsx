import LogoIcon from '@/components/icons/logo';
import { ImageResponse } from 'next/og';


export const runtime = 'edge'; // Ensure this is set

export type Props = {
  title?: string;
  sitename?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {

  const { title = process.env.SITE_NAME } = props || {};

  const sitename = process.env.STORE_DOMAIN || 'http://localhost:3000';

  const fontData = await fetch(`${sitename}/font/Vazir-Bold.ttf`).then(res => res.arrayBuffer());

  // const file = await readFile(join(process.cwd(), './font/Vazir-Bold.ttf'));
  // const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-primary">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}