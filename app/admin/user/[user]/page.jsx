"use client"
import ValidateAuth from "@/app/components/ValidateAuth";
import { getUserByID } from "@/app/utils/apis";
import { Badge, Card, Flex, Group, Text } from "@mantine/core"
import { useEffect, useState } from "react";

export default function User({ params: { user } }) {
  const [userData, setUserData] = useState([]);

  const getUsers = async () => {
    const res = await getUserByID(user);
    setUserData(res.data?.users[0]);
  }

  useEffect(() => {
    getUsers();
  }, [user]) // Added user dependency

  return (
    <ValidateAuth>
      <Card padding={"xl"} radius={"lg"} shadow="sm" withBorder m={30} >
        <Group>
          <Text fw={700}>Name:</Text>
          <Text>{userData?.fname + " " + userData?.lname}</Text>
          <Badge
            color={
              userData.paymentVerified ?
                "green" :
                (userData.paymentFormFilled && !userData.paymentRejected ?
                  "yellow" :
                  "red")}
            variant="light"
          >
            {userData.paymentVerified ?
              "Verified" :
              (userData.paymentFormFilled ?
                (userData.paymentRejected ?
                  "Rejected" :
                  "Verification Pending") :
                "Unverified")
            }
          </Badge>
        </Group>
        <Group>
          <Text fw={700}>Tarang-ID:</Text>
          <Text>{userData.tarang_id}</Text>
        </Group>
        <Group>
          <Text fw={700}>Email:</Text>
          <Text>{userData.email}</Text>
        </Group>
        <Group>
          <Text fw={700}>Phone No:</Text>
          <Text>{userData.phone}</Text>
        </Group>
        <Group>
          <Text fw={700}>College:</Text>
          <Text>{userData.college}</Text>
        </Group>
        <Group>
          <Text fw={700}>Cost incurred:</Text>
          <Text>{userData.totalCost}</Text>
        </Group>
        <Group>
          <Text fw={700}>Accomodation Taken:</Text>
          <Text>{userData.hasAccomodation ? "Yes" : "No"}</Text>
        </Group>
        <Group>
          <Text fw={700}>Pass Type:</Text>
          <Text>
            {
              userData.paymentFormFilled ?
                (userData.purchaseTarangCard ?
                  "Tarang Card" :
                  "Entry Pass (Individual event)") :
                "None Yet"
            }
          </Text>
        </Group>
        <Group>
          <Text fw={700}>Events Registered:</Text>
          <Flex wrap={"wrap"} gap={"md"}>{userData.events?.map((event,index) => {
            return (
              <Card padding={"sm"} radius={"sm"} withBorder key={index}>
                <Text fw={700}>{event.slug}</Text>
                {event.registerAs ? <Text>{event.registerAs}</Text> : <></>}
              </Card>
            )
          })}</Flex>
        </Group>
      </Card>
    </ValidateAuth>
  )
}