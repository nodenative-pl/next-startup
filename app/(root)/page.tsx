import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

type Params = Promise<{ query?: string }>
export default async function Home({searchParams}: { searchParams: Params }) {
    const {query} = await searchParams;

    const posts = [{
        _id: 1,
        _createdAt: new Date(),
        author: {_id: 1, name: 'John', image: 'https://placehold.co/48x48/png'},
        description: 'Test',
        image: 'https://placehold.co/600x400/png',
        category: 'Robots',
        title: 'Car Robots',
        views: 55,
    }]

    return (
        <>
            <section className='main_container'>
                <div className="heading">Select your Startup</div>
                <SearchForm query={query}/>
            </section>
            <section className='section_container'>
                <p className='text-2xl'>
                    {query ? `Search results for ${query}` : 'All results'}
                </p>

                <ul className='mt-7 card_grid'>
                    {posts?.length
                        ? posts.map((post) => (
                            <StartupCard post={post} key={post._id}/>
                        ))
                        : <p className='no-results'>No results found</p>}
                </ul>

            </section>
        </>
    );
}
