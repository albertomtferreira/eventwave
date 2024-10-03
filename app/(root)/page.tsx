import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { landing } from "@/constants/data";
import { getAllEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6,
  });

  return (
    <>
      {/* Hero 1 - Landing Page */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">{`${landing.hero1_title}`}</h1>
            <p className="p-regular-20 md:p-regular-24">{`${landing.hero1_description}`}</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href={`${landing.hero1_href_events}`}>
                {`${landing.hero1_button}`}
              </Link>
            </Button>
          </div>
          <Image
            src={`${landing.hero1_image}`}
            alt={`${landing.hero1_alt}`}
            width={`${landing.hero1_width}`}
            height={`${landing.hero1_height}`}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      {/* Hero 2 - Landing Page */}
      <section id={`${landing.hero2_id}`} className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold ">
          {`${landing.hero2_title1}`}<br />{`${landing.hero2_title2}`}
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          {`${landing.hero2_search_label}`}
          {`${landing.hero2_category_label}`}

        </div>
        <Collection
          data={events?.data}
          emptyTitle='No Events found'
          emptyStateSubtext='Come Back Later'
          collectionType='All_Events'
          limit={6}
          page={1}
          totalPages={2}
        />

      </section>
    </>

  );
}
