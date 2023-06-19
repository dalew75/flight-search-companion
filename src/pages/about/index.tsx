import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const About: NextPage = () => {
  const title = 'About';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0c918a] to-[#03091b]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-violet-200 sm:text-[5rem]">
            {title}
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/about/mission"
            >
              <h3 className="text-2xl font-bold">Our Mission →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/about/team"
            >
              <h3 className="text-2xl font-bold">Our Team →</h3>
              <div className="text-lg">
                Meet our team
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;