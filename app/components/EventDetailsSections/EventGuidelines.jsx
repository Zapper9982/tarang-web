"use client";
import { Divider, Stack, Text, List, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function EventGuidelines({ event }) {
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const [guidelines, setGuidelines] = useState([
    {
      title: "Instructions",
      content: event.instructions.map((instruction) => instruction),
    },
    {
      title: "Participation Type",
      content: ['You can participate as "' + event.event_type + '".'],
    },
    {
      title: "Coordinators",
      content: event.coordinators.map(
        (coordinator) => coordinator.name + " (+91 " + coordinator.pno + ")"
      ),
    },
    {
      title: "Helpdesk",
      content: [event.helpdesk.name + " (+91 " + event.helpdesk.pno + ")"],
    },
    {
      title: "Prize Pool",
      content: [`There is a prize pool of ₹${event.prize_pool} to be won.`],
    },
  ]);

  useEffect(() => {
    if (event.judging_criteria?.length) {
      setGuidelines((oldGuidelines) => [
        {
          title: "Judging Criteria",
          content: event.judging_criteria.map((criteria) => criteria),
        },
        ...oldGuidelines,
      ]);
    }
  }, [event.judging_criteria]); // Added judging_criteria dependency

  return (
    <Stack
      px={isMobileView ? "2rem" : "6.75rem"}
      py={isMobileView ? "2rem" : "4.5rem"}
    >
      <Text c="#fff" size={isMobileView ? "1.5rem" : "2rem"} fw="500">
        Guidelines
      </Text>
      <Divider mt={"0.5rem"} size="1.5px" />

      {guidelines.map((event, index) => {
        return (
          <Box key={index}>
            <Text
              c="#fff"
              size={isMobileView ? "0.75rem" : "1.125rem"}
              fw="500"
              my="md"
            >
              {event.title}:
            </Text>
            <List withPadding c="#9EA5AD" spacing="xs">
              {event.content.map((item, index) => {
                return (
                  <List.Item key={index}>
                    <Text fz={isMobileView ? "0.75rem" : "1.125rem"}>
                      {item}
                    </Text>
                  </List.Item>
                );
              })}
            </List>
          </Box>
        );
      })}
    </Stack>
  );
}
