import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Team: NextPage = () => {
  const title = 'Our Team';

  const { data: sessionData } = useSession();

  const message = api.example.hello.useQuery({text:'Dale'});
  console.log(`message==============================${message}`)

  const teamMembersFromApi = api.example.getTeamMembers.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-lg text-pink-300 from-[#ffffff] to-[#333333]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-violet-200 sm:text-[5rem]">
            {title}
          </h1>
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
              <div className="max-w-2xl">
                <h2>{message.data}</h2>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper suspendisse.</p>
              </div>


              {teamMembersFromApi.data ? (
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                  {teamMembersFromApi.data.map((teamMember, index) => (
                    <li>
                      <div className="flex items-center gap-x-6">
                        <img className="h-16 w-16 rounded-full" src={teamMember.img} alt="" />
                        <div>
                          <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{teamMember.name}</h3>
                          <p className="text-sm font-semibold leading-6 text-indigo-600">{teamMember.title}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) :
                <p>No team members</p>
              }

            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Team;