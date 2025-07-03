"use client"
import ValidateAuth from "@/app/components/ValidateAuth";
import { getAllUsers } from "@/app/utils/apis";
import { Badge, Card, Flex, Group, Pagination, Table, Text, TextInput, Title, rem } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function User() {
    const [globalUsers, setGlobalUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [value, setValue] = useState('');
    const total = users.length / 10 + 1;

    const getUsers = async () => {
        const res = await getAllUsers();
        setGlobalUsers(res.data?.users);
        setUsers(res.data?.users);
    }
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (value === "") setUsers(globalUsers)
        else {
            const regex = new RegExp(value)
            setUsers(globalUsers.filter(usr => usr.tarang_id.match(regex)));
        }
    }, [value, globalUsers]); // Added globalUsers dependency

    const rows = (currentPage) => {

        const start = (currentPage - 1) * 10;
        const end = Math.min(start + 10, users.length);
        console.log(start, end, currentPage, users.length);
        return users.slice(start, end).map((user, index) => (
            <Table.Tr key={user.tarang_id}>
                <Table.Td>{(activePage - 1) * 10 + index + 1}</Table.Td>
                <Table.Td>{user.fname + " " + user.lname}</Table.Td>
                <Table.Td>{user.tarang_id}</Table.Td>
                <Table.Td>{user.phone}</Table.Td>
                <Table.Td>{user.college}</Table.Td>
                <Table.Td>
                    <Badge
                        color={
                            user.paymentVerified ?
                                "green" :
                                (user.paymentFormFilled && !user.paymentRejected ?
                                    "yellow" :
                                    "red")}
                        variant="light"
                    >
                        {user.paymentVerified ?
                            "Verified" :
                            (user.paymentFormFilled ?
                                (user.paymentRejected ?
                                    "Rejected" :
                                    "Verification Pending") :
                                "Unverified")}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    {
                        user.paymentFormFilled ?
                            (user.purchaseTarangCard ?
                                "Tarang Card" :
                                "Entry Pass (Individual event)") :
                            "None Yet"
                    }
                </Table.Td>
                <Table.Td>
                    <Link href={`/admin/user/${user.tarang_id}`} style={{ color: "purple" }}>
                        Link
                    </Link>
                </Table.Td>
            </Table.Tr>
        ))
    };

    return (
        <ValidateAuth>
            <Title order={1}>
                All Users
            </Title>
            <Card padding={"lg"} radius={"lg"} m={10} shadow="sm" withBorder>
                <Group>
                    <Text fw={700}>Total Users:</Text>
                    <Text>{users.length}</Text>
                </Group>
            </Card>
            <TextInput
                mt={"md"}
                placeholder="Search Users"
                label="Search Users by tarang ID"
                rightSection={
                    <IconSearch
                        style={{ width: rem(20), height: rem(20) }}
                    />
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
                m={20}
            />
            <Table.ScrollContainer minWidth={500} type="native">
                <Table striped highlightOnHover withTableBorder m={20}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>S. No.</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Tarang-ID</Table.Th>
                            <Table.Th>Phone</Table.Th>
                            <Table.Th>College</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Pass-type</Table.Th>
                            <Table.Th>User-card</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows(activePage)}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Flex justify={"center"}>
                <Pagination value={activePage} onChange={setActivePage} total={total} mt={10} />
            </Flex>
        </ValidateAuth>
    )
}