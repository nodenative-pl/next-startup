import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupCardType} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/query";
import {sanityFetch} from "@/sanity/lib/live";

type Params = Promise<{ query?: string }>
export default async function Home({searchParams}: { searchParams: Params }) {
    const {query} = await searchParams;
    const params = { search: query || null}

    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

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
                        ? posts.map((post: StartupCardType) => (
                            <StartupCard post={post} key={post._id}/>
                        ))
                        : <p className='no-results'>No results found</p>}
                </ul>
            </section>
        </>
    );
}
