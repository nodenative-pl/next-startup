import SearchForm from "@/components/SearchForm";

type Params = Promise<{ query?: string }>
export default async function Home({searchParams}: { searchParams: Params }) {
    const {query} = await searchParams;

    return (
        <section className='main_container'>
            <div className="heading">Select your Startup</div>
            <SearchForm query={query}/>
        </section>
    );
}
