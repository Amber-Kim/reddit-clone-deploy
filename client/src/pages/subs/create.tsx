import React, { FormEvent, useState } from 'react';
import InputGroup from '../../components/InputGroup';
import axios from 'axios'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

const SubCreate = () => {

  let router = useRouter();
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState<any>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post("/subs", { name, title, description })

      router.push(`/r/${res.data.name}`);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data)
    }
  }

  return (
    <div className="flex flex-col justify-center pt-16">
      <div className="w-10/12 mx-auto md:w-96 bg-white rounded md:w-96 p-4">
        <h1 className="mb-2 text-lg font-medium">Creat a Community</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <p className="font-medium">Name</p>
            <p className="mb-2 text-xs text-gray-400">r/Community_name</p>
            <InputGroup
              placeholder="Name"
              value={name}
              setValue={setName}
              error={errors.name}
            />
          </div>
          <div className="my-6">
            <p className="font-medium">Title</p>
            <p className="mb-2 text-xs text-gray-400">It shows what contents of community. You can change at any time</p>
            <InputGroup
              placeholder="Title"
              value={title}
              setValue={setTitle}
              error={errors.title}
            />
          </div>
          <div className="my-6">
            <p className="font-medium">Description</p>
            <p className="mb-2 text-xs text-gray-400"> 
              This is a way how new users can understand of community
            </p>
            <InputGroup
              placeholder="Description"
              value={description}
              setValue={setDescription}
              error={errors.description}
            />
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-1 text-sm font-semibold rounded text-white bg-gray-400 border">
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCreate;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  try {
    const cookie = req.headers.cookie;

    // If there is no cookie, then throw error
    if(!cookie) throw new Error("Missing auth token cookie")
    
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`,
      { headers: { cookie } })
    return {props: {} }

  } catch (error) {
    //
    res.writeHead(307, { Location: "/login" }).end()
    return {props: {}}
  }
}