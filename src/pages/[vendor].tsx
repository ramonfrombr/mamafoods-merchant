import Airtable from "airtable";
import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";

// import { Hero } from "../../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
// import { DarkModeSwitch } from "../../components/DarkModeSwitch";
// import { CTA } from "../../components/CTA";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CalendarModal } from "../components/merchants/CalendarModal";
import { OrdersGroup } from "../components/merchants/OrdersGroup";
import { byDeliveryDate, groupOrders } from "../collections";

import {MdPrint} from 'react-icons/md'
import {FaCalendarAlt} from 'react-icons/fa';

/*
export const getServerSideProps: GetServerSideProps = async (context) => {


    const orderItemsTable = new Airtable({ apiKey: process.env.AIRTABLE_KEY })
		.base(process.env.AIRTABLE_BASE)
		.table("Order Line Items");

	const supplyTable = new Airtable({ apiKey: process.env.AIRTABLE_KEY })
		.base(process.env.AIRTABLE_BASE)
		.table("Supply");

	let orders = [];
	let fulfilledOrders = [];
	let supplyVendor = null;


	const emptyResponse = {
		props: {
			orders: [],
			fulfilledOrders: [],
			supplyVendor: null,
		},
	};

	const fetchOrders = async (vendorName) => {

		try {

			const orderItemsQuery = {
				filterByFormula: `AND({Vendor Slug} = "${vendorName}")`,
				view: "API view",
			};

			const statusField = "Fulfillment Status (from Order)";

			await orderItemsTable
				.select(orderItemsQuery)
				.eachPage(function page(records, fetchNextPage) {

					records.forEach(function (record) {

						const order = { id: record.id, ...record.fields };
                        
						if (record.fields[statusField][0] === "unfulfilled") {
							orders.push(order);
						} else {
							fulfilledOrders.push(order);
						}
					});
                    
					fetchNextPage();

				});

			const supplyQuery = {
				filterByFormula: `AND({Vendor Slug} = "${vendorName}")`,
				view: "API view",
				maxRecords: 1,
			};

			await supplyTable
				.select(supplyQuery)
				.eachPage(function page(records, fetchNextPage) {
					supplyVendor = records[0].fields;
					fetchNextPage();
				});

			return {
				props: {
					orders: orders,
					fulfilledOrders: fulfilledOrders,
					supplyVendor: supplyVendor,
				},
			};
            
		} catch (error) {

			console.error(error);
			return emptyResponse;
		}
	};


    // Selects the vendor slug in the url
	const vendorName = context.query.vendor.toString().toLowerCase();

    if (vendorName === "favicon.ico") return emptyResponse;
	
    return fetchOrders(vendorName);
};
*/





/*
##### ##### ##### #   # ##### #####       ##### ##### ##### ##### 
#     #     #   # #   # #     #   #       #   # #   # #   # #   # 
##### ##### ##### #   # ##### #####       ##### ##### #   # ##### 
    # #     #  #   # #  #     #  #        #     #  #  #   # #     
##### ##### #   #   #   ##### #   #       #     #   # ##### #     
*/

export const getServerSideProps: GetServerSideProps = async (context) => {

    {/*
     ###  ##### ##### #####  ###  ####  #     ##### 
    ## ##   #   #   #   #   ## ## #   # #     #     
    #   #   #   #####   #   #   # ####  #     ##### 
    #####   #   #  #    #   ##### #   # #     #     
    #   # ##### #   #   #   #   # ####  ##### #####
    */}

    const orderItemsTable = new Airtable({ apiKey: process.env.AIRTABLE_KEY })
		.base(process.env.AIRTABLE_BASE)
		.table("Order Line Items");

	const supplyTable = new Airtable({ apiKey: process.env.AIRTABLE_KEY })
		.base(process.env.AIRTABLE_BASE)
		.table("Supply");

	let orders = [];
	let fulfilledOrders = [];
	let supplyVendor = null;


	const emptyResponse = {
		props: {
			orders: [],
			fulfilledOrders: [],
			supplyVendor: null,
		},
	};

    {/*
    ##### ##### ##### ##### #   #       ##### ##### ####  ##### ##### 
    #     #       #   #     #   #       #   # #   # #   # #     #   # 
    ##### #####   #   #     #####       #   # ##### #   # ##### ##### 
    #     #       #   #     #   #       #   # #  #  #   # #     #  #  
    #     #####   #   ##### #   #       ##### #   # ####  ##### #   # 
    */}

	const fetchOrders = async (vendorName) => {

		try {

			const orderItemsQuery = {
				filterByFormula: `AND({URL Token} = "${vendorName}")`,
				view: "API view",
			};

			const statusField = "Fulfillment Status (from Order)";

			await orderItemsTable
				.select(orderItemsQuery)
				.eachPage(function page(records, fetchNextPage) {

					records.forEach(function (record) {

						const order = { id: record.id, ...record.fields };
                        
                        /*

                        Console log

                        console.log("###################################");
                        console.log("FETCH ORDER");
                        console.log(order['Fulfillment Status (META)']);
                        */

                        /*
                        Here, the condition checks for the 'fulfilled' status on the order, not on the order item. This means that an order item can have an 'unfulfilled' status while it's order has a 'fulfilled' status. In this case, the complete order will be appended to the fulfilled orders but the order item will remain with a 'unfulfilled' status.
                        */
						if (record.fields[statusField][0] === "unfulfilled") {
							orders.push(order);
						} else {
							fulfilledOrders.push(order);
						}
					});
                    
					fetchNextPage();

				});

			const supplyQuery = {
				filterByFormula: `AND({URL Token} = "${vendorName}")`,
				view: "API view",
				maxRecords: 1,
			};

			await supplyTable
				.select(supplyQuery)
				.eachPage(function page(records, fetchNextPage) {
					supplyVendor = records[0].fields;
					fetchNextPage();
				});

			return {
				props: {
					orders: orders,
					fulfilledOrders: fulfilledOrders,
					supplyVendor: supplyVendor,
				},
			};
            
		} catch (error) {

			console.error(error);
			return emptyResponse;
		}
	};

    // Selects the vendor URL token in the url
    const vendorUrlToken = context.query.vendor.toString();

    console.log("vendor url token: " + vendorUrlToken);

    if (vendorUrlToken === "favicon.ico") return emptyResponse;
	
    return fetchOrders(vendorUrlToken);

};




const Index = ({ orders, fulfilledOrders, supplyVendor }) => {
    

    /*
    ##### #####  ###  ##### ##### 
    #       #   ## ##   #   #     
    #####   #   #   #   #   ##### 
        #   #   #####   #   #     
    #####   #   #   #   #   ##### 
    */

	const [groupedOrders, setGroupedOrders] = useState([]);
	const [groupedFulfilledOrders, setGroupedFulfilledOrders] = useState([]);
	const [comission, setComission] = useState(0.1);
	const { isOpen, onOpen, onClose } = useDisclosure();


	const router = useRouter();

	const { vendor } = router.query;

	if (vendor === "favicon.ico") return <></>;

	const vendorName = supplyVendor["Name"];

    const printPage = () => {
        window.print();
    };



    /*
    ##### ##### ##### ##### ##### ##### 
    #     #     #     #     #       #   
    ##### ##### ##### ##### #       #   
    #     #     #     #     #       #   
    ##### #     #     ##### #####   #   
    */

	useEffect(() => {
		
        setGroupedOrders(groupOrders(orders).sort(byDeliveryDate));

		setGroupedFulfilledOrders(
			groupOrders(fulfilledOrders).sort(byDeliveryDate)
		);

		if (supplyVendor["Mama  Comission"] == null) {

			setComission(0);
		
        } else {
		
            setComission(supplyVendor["Mama  Comission"]);
		
        }
	}, [vendor]);




	return (
		<>
            {/*
            
            #   # #####  ###  ####  ##### ##### 
            #   # #     ## ## #   # #     #   # 
            ##### ##### #   # #   # ##### ##### 
            #   # #     ##### #   # #     #  #  
            #   # ##### #   # ####  ##### #   # 
            
            */}
			<Head>
				<title>MamaFoods - {vendorName}'s orders</title>
				<meta
					property="og:title"
					content={`MamaFoods - ${vendorName}'s orders`}
					key="title"
				/>
			</Head>

			<Container height="100%">
				
                <CalendarModal
					url={supplyVendor["Calendar URL"]}
					isOpen={isOpen}
					onClose={onClose}
				/>
				
                <Header vendor={vendorName} />

				<Main>

                    {/*                              
                    #   # ##### #   # #   # 
                    ## ## #     ##  # #   # 
                    # # # ##### # # # #   # 
                    #   # #     #  ## #   # 
                    #   # ##### #   # ##### 
                    */}

                    <Flex justify={"end"} mr={5}>

                        {supplyVendor["Calendar URL"] && (
                            <Button
                                onClick={onOpen}
                                colorScheme="gray"
                                style={{marginRight: '10px'}}
                            >
                                <FaCalendarAlt style={{marginRight: '10px'}} />
                                Calendar view
                            </Button>
                        )}
                        <Button onClick={printPage}>
                            <MdPrint style={{marginRight: '10px'}} />
                            Print All Orders
                        </Button>
                    </Flex>

                    {/*               
                    ##### ##### ####  ##### ##### ##### ##### ##### #   # ##### 
                    #   # #   # #   # #     #   # #     #   # #   # #   # #   # 
                    #   # ##### #   # ##### ##### # ### ##### #   # #   # ##### 
                    #   # #  #  #   # #     #  #  #   # #  #  #   # #   # #     
                    ##### #   # ####  ##### #   # ##### #   # ##### ##### #     
                    */}
				
                    {/*               
                    ##### ##### #   # ####  ##### #   # ##### 
                    #   # #     ##  # #   #   #   ##  # #     
                    ##### ##### # # # #   #   #   # # # # ### 
                    #     #     #  ## #   #   #   #  ## #   # 
                    #     ##### #   # ####  ##### #   # ##### 
                    */}

					<Heading as="h5" size="md" letterSpacing={"tighter"}>
						Pending orders
					</Heading>

					{/*
                    <Text>
                        <strong>{groupedOrders.length}</strong> pending orders for <Code>{vendor}</Code>.
                    </Text>
                    */}

                    
					{groupedOrders.map( (group, _index) => {

                        return (
                            <OrdersGroup
                                key={group.orderId}
                                orders={group.orders}
                                recordId={group.recordId}
                                groupId={group.orderId}
                                deliveryDate={group.deliveryDate}
                                readyToPickup={group.readyToPickup}
                                handledToDriver={group.handledToDriver}
                                comission={comission}
                            />
                        )
                    })}

                    {/*
                    
                    ##### #   # #     ##### ##### #     #     ##### ####  
                    #     #   # #     #       #   #     #     #     #   # 
                    ##### #   # #     #####   #   #     #     ##### #   # 
                    #     #   # #     #       #   #     #     #     #   # 
                    #     ##### ##### #     ##### ##### ##### ##### ####  

                    */}

					{groupedFulfilledOrders && (
						<>
							<Divider />
							<Heading as="h5" size="md" letterSpacing={"tighter"}>
								Completed orders
							</Heading>
						</>
					)}

					{groupedFulfilledOrders.map((group, _index) => (
						<OrdersGroup
							key={group.orderId}
							orders={group.orders}
							recordId={group.recordId}
							groupId={group.orderId}
							deliveryDate={group.deliveryDate}
							readyToPickup={group.readyToPickup}
							handledToDriver={group.handledToDriver}
							comission={comission}
						/>
					))}
				</Main>

                {/*
                
                ##### ##### ##### ##### ##### ##### 
                #     #   # #   #   #   #     #   # 
                ##### #   # #   #   #   ##### ##### 
                #     #   # #   #   #   #     #  #  
                #     ##### #####   #   ##### #   # 
  
                */}

				{/* <DarkModeSwitch /> */}
				<Footer>
					<Text>Made with ❤️ @ 2022 mamafoods.com</Text>
				</Footer>
			</Container>
		</>
	);
};

export default Index;
