import React from 'react';
import CreateStartupForm from "@/components/CreateStartupForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const CreateStartupPage = async () => {

    const session = await auth()
    if (!session) redirect('/')

    return (
        <>
            <section className="main_container !min-h-[230px]">
                <h1 className='heading'>Submit Your Startup</h1>
            </section>
            <CreateStartupForm/>
        </>
    );
};

export default CreateStartupPage;