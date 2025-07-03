import { Text, Stack, Grid, Flex, Box, Paper } from "@mantine/core";
import cssStyles from "@/app/styles/events.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

export default function EventCards({ selectedEvents, events }) {
  function CardComp({ event }) {
    const [minSrc, setMinSrc] = useState();
    const [loaded, setLoaded] = useState(false);
    const isMobileView = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
      let srcArr=event.images.mainPhone.split('/');
      srcArr.splice(6,0,'c_scale,w_15');
      srcArr.splice(7,0,'f_auto');
      setMinSrc(srcArr.join('/'));
    }, [event.images.mainPhone]) // Added mainPhone dependency
    
    return (
      <Link href={`/events/${event.slug}`}>
        <Paper radius={0} p={0} bg={"transparent"}>
          <Flex
            justify={"space-between"}
            p={0}
            direction={"column"}
            className={cssStyles.EventCardsFlex}
          >
            <Box
              style={{ overflow: "hidden" }}
              w={"100%"}
              className={cssStyles.EventCardsBox}
            >
              <div
                className={loaded ? cssStyles.loaded : cssStyles.blur}
                style={{
                  backgroundImage: `url(${minSrc})`, 
                  backgroundSize: "cover", 
                  backgroundPosition: "center", 
                  height: isMobileView ? "100%" : "300px",
                  position: "relative"
                }}
              >
                <Image
                  src={event.images.mainPhone}
                  width={0}
                  height={300}
                  sizes="100vw"
                  style={{
                    objectPosition: "50% 20%",
                    transition: "0.3s",
                    width: "100%",
                    minHeight: "120px",
                    objectFit: "cover",
                    opacity: "0",
                    transition: "opacity 400ms ease-in-out",
                  }}
                  alt={event.name}
                  className={cssStyles.EventCardsImage}
                  onLoadingComplete={() => {
                      setLoaded(true)
                    }
                  }
                />
              </div>
            </Box>
            <Stack
              p={"12px 24px 24px 24px"}
              gap={8}
              align="flex-start"
              w={"100%"}
              style={{
                border: "3px solid #000",
              }}
              className={cssStyles.EventCardsStack}
              bg={"white"}
            >
              <Text
                size={"lg"}
                fw={500}
                lineClamp={1}
                className={cssStyles.EventCardText}
              >
                {event.name}
              </Text>
              <Text
                c="#676E76"
                size="sm"
                style={{
                  wordBreak: "break-word",
                }}
                lineClamp={2}
                className={cssStyles.EventCardText}
              >
                {event.description}
              </Text>
              <Text
                variant="gradient"
                size="sm"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
                hiddenFrom="sm"
              >
                Read more
              </Text>
            </Stack>
          </Flex>
        </Paper>
      </Link>
    );
  }

  return (
    <Stack
      bg={"#EFDEE3"}
      align="flex-start"
      pt={"1rem"}
      pb={"4rem"}
      px={"5.5rem"}
      className={cssStyles.EventCardStack}
    >
      <Grid gutter={"1.75rem"} px={0} pr={"1rem"}>
        {selectedEvents.length == 0
          ? events.map((event, index) => {
              return (
                <Grid.Col
                  className={cssStyles.EventCardsGridCol}
                  span={4}
                  key={index}
                >
                  <CardComp event={event} />
                </Grid.Col>
              );
            })
          : events
              .filter((el) => selectedEvents.includes(el.event_category))
              .map((event, index) => {
                return (
                  <Grid.Col
                    className={cssStyles.EventCardsGridCol}
                    span={4}
                    key={index}
                  >
                    <CardComp event={event} />
                  </Grid.Col>
                );
              })}
      </Grid>
    </Stack>
  );
}
