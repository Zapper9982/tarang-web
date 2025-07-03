import { Box } from "@mantine/core";
import MainAppShell from "@/app/components/MainAppShell";
import HeroSection from "@/app/components/EventDetailsSections/HeroSection";
import EventDetails from "@/app/components/EventDetailsSections/EventDetails";
import EventGuidelines from "@/app/components/EventDetailsSections/EventGuidelines";
import { getAllEvents, getEvent } from "@/app/utils/apis";
import Head from "next/head";

export default async function Events({ params: { event } }) {
  const eventDetail = await getEvent(event);
  const eventData = eventDetail.data.event;

  return (
    <>
      <Head>
        <title>{eventData.name} | Tarang'23</title>
        <meta name="description" content={eventData.description} />
        <meta
          name="keywords"
          content={
            eventData.name +
            "," +
            eventData.event_category +
            ", Tarang, Tarang'23, IIITDMJ Cultural Fest"
          }
        />
      </Head>
      <MainAppShell>
        <Box style={{ backgroundColor: "#0F0F0F" }}>
          <HeroSection event={eventData} />
          <EventDetails event={eventData} />
          <EventGuidelines event={eventData} />
        </Box>
      </MainAppShell>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const eventDetails = await getAllEvents();
    const events = eventDetails.data.events;
    return {
      paths: events.map((event) => ({
        params: { event: event.slug },
      })),
      fallback: 'blocking', // Changed from false to blocking
    };
  } catch (error) {
    console.error("Failed to fetch events for static paths:", error);
    // Return empty paths and use fallback
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export const generateMetadata = async ({ params }) => {
  const event = params.event;
  const eventDetails = await getEvent(event);
  const eventData = eventDetails.data.event;
  const title = `${eventData.name} | Tarang'23`;
  const description = `${eventData.description}`;
  const keywords = `${eventData.name}, Tarang, Tarang'23, IIITDMJ Cultural Fest, ${eventData.name} Details, ${eventData.name} Guidelines`;
  return {
    title,
    description,
    keywords,
  };
};
