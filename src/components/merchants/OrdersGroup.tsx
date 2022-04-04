import {
	Box,
	Code,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Spinner,
	Switch,
	Tag,
	Text,
	useToast,
    Button
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Decimal } from "decimal.js";
import { useState, useEffect, useRef, Fragment } from "react";
import { useReactToPrint } from "react-to-print";

import { OrderCard } from "./OrderCard";


import {MdPrint} from 'react-icons/md';
import {FaClock, FaCheckSquare, FaTruck} from 'react-icons/fa';

const postOrderItem = (payload) => {

	return fetch("/api/orderitem", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
};


export const OrdersGroup = (props) => {

    /*
    ##### #####  ###  ##### ##### 
    #       #   ## ##   #   #     
    #####   #   #   #   #   ##### 
        #   #   #####   #   #     
    #####   #   #   #   #   ##### 
    */

	const [readyToPickup, setReadyToPickup] = useState(false);
    const [readyToPickupLoading, setReadyToPickupLoading] = useState(false);
    const [handledToDriver, setHandledToDriver] = useState(false);
    const [handledToDriverLoading, setHandledToDriverLoading] = useState(false);
    const [orderFulfilled, setOrderFulfilled] = useState(null)

	const toast = useToast();
	
    const deliveryDate = props.deliveryDate
		? format(props.deliveryDate, "yyyy-MM-dd")
		: "";
	
        // const deliveryTime = coalesce(...props.orders.map((order) => order["Delivery time"]));
	
    const deliveryTime = "10AM - 12PM";
	
    
    const totalSum = props.orders
		.map((order) =>
			new Decimal(order["Price"] || 0).mul(order["Quantity"] || 1)
		)
		.reduce((item, amount) => item.plus(amount), new Decimal(0));


	const totalPayment =
		totalSum === 0 ? 0 : (totalSum - totalSum * props.comission).toFixed(2);


	const totalUnits = props.orders
		.map((order) => order["Quantity"])
		.reduce((item, amount) => item + amount, 0);


    /*
    ##### ##### ##### ##### ##### ##### 
    #     #     #     #     #       #   
    ##### ##### ##### ##### #       #   
    #     #     #     #     #       #   
    ##### #     #     ##### #####   #   
    */
	useEffect(() => {
		setReadyToPickup(props.readyToPickup);
		setHandledToDriver(props.handledToDriver);
        setOrderFulfilled(props.orders[0]['Fulfillment Status (from Order)'][0]);
	}, []);


    /* 
    ##### ##### ##### #   # ##### 
    #   # #   #   #   ##  #   #   
    ##### #####   #   # # #   #   
    #     #  #    #   #  ##   #   
    #     #   # ##### #   #   #   
    */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => (
            componentRef.current
        ),
    });

    /*
    ##### ##### ##### ##### #     ##### 
      #   #   # #     #     #     #     
      #   #   # # ### # ### #     ##### 
      #   #   # #   # #   # #     #     
      #   ##### ##### ##### ##### ##### 
    */
	const toggleReadyToPickup = (value, orders) => {

		setReadyToPickupLoading(true);

		const oldValue = readyToPickup;

		try {

			const payload = orders.map((order) => ({
				id: order.id,
				fields: { "Ready to pickup": value },
			}));

			postOrderItem(payload).then((res) => {

				if (res.status !== 200) {

					setReadyToPickup(oldValue);

					toast({
						title: "Error.",
						description: "Problem updating order.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});

				} else {

					setReadyToPickup(value);

					toast({
						title: "Success.",
						description: "Order updated.",
						status: "success",
						duration: 9000,
						isClosable: true,
					});

				}

				setReadyToPickupLoading(false);
			});

		} catch (error) {

			setReadyToPickup(oldValue);
			setReadyToPickupLoading(false);
		}
	};

	const toggleHandledToDriver = (value, orders) => {

		setHandledToDriverLoading(true);

		const oldValue = handledToDriver;

		try {

			const payload = orders.map((order) => ({
				id: order.id,
				fields: { "Handled to driver": value },
			}));

			postOrderItem(payload).then((res) => {

				if (res.status !== 200) {
					setHandledToDriver(oldValue);
					toast({
						title: "Error.",
						description: "Problem updating order.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});

				} else {

					setHandledToDriver(value);
					toast({
						title: "Success.",
						description: "Order updated.",
						status: "success",
						duration: 9000,
						isClosable: true,
					});

				}

				setHandledToDriverLoading(false);
			});

		} catch (error) {

			setHandledToDriver(oldValue);
			setHandledToDriverLoading(false);

		}
	};


    /*
    ##### ##### #   # ####  ##### ##### 
    #   # #     ##  # #   # #     #   # 
    ##### ##### # # # #   # ##### ##### 
    #  #  #     #  ## #   # #     #  #  
    #   # ##### #   # ####  ##### #   # 
    */

	return (
        <div
            style={{
                backgroundColor: '#EAEAEA',
                padding: '20px',
                pageBreakInside: 'avoid',
                display: 'block'
            }}
            className="orders-group"
            ref={componentRef} 
        >
            <style>
                {`@media print {
                    .orders-group {
                        margin: 40px;
                        background-color: #EAEAEA !important;
                        -webkit-print-color-adjust: exact;
                        page-break-inside: avoid
                    }
                }`}
            </style>

            <Heading
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                as="h5"
                size="md"
                mt={3}
                mb={5}
            >

                <Text>
                    Order {props.groupId}

                    <Tag bg='white'> {totalUnits} items</Tag>

                    <Tag
                        ml='3'
                        bg={orderFulfilled == 'fulfilled' ? 'green.200' : 'yellow.200'}
                        color={orderFulfilled == 'fulfilled' ? 'green.800' : 'yellow.800'}
                        fontWeight='bold'
                    >
                        {orderFulfilled}
                    </Tag>
                </Text>


                <Button
                    onClick={handlePrint}
                ><MdPrint style={{marginRight: '10px'}} />Print Order</Button>
                
            </Heading>

            {/*
            ##### ##### ####  ##### #####       ##### #   # ##### ##### 
            #   # #   # #   # #     #   #         #   ##  # #     #   # 
            #   # ##### #   # ##### #####         #   # # # ##### #   # 
            #   # #  #  #   # #     #  #          #   #  ## #     #   # 
            ##### #   # ####  ##### #   #       ##### #   # #     ##### 
            */}
            {deliveryDate && (
                <Box mt={[0, "0.2rem !important"]} style={{display:'flex', alignItems: 'center'}}>
                    <FaClock style={{marginRight: '10px'}}/>Pickup: 
                    <Code ml='3'  bg='white'>
                        {deliveryDate} &bull; {deliveryTime}
                    </Code>
                </Box>
            )}

            <FormControl
                display="flex"
                alignItems="center"
                mt={[0, "0.4rem !important"]}
            >
                <FormLabel htmlFor={`ready-pickup-${props.groupId}`} mb="0" style={{display:'flex', alignItems: 'center'}}>
                    <FaCheckSquare style={{marginRight: '10px'}}/>Ready to pickup?
                </FormLabel>
                <Switch
                    id={`ready-pickup-${props.groupId}`}
                    onChange={(ev) =>
                        toggleReadyToPickup(ev.target.checked, props.orders)
                    }
                    isChecked={readyToPickup}
                    isDisabled={readyToPickupLoading}
                />
                {readyToPickupLoading && <Spinner size="sm" ml={3} />}
            </FormControl>

            <FormControl
                display="flex"
                alignItems="center"
                mt={[0, "0.4rem !important"]}
            >
                <FormLabel htmlFor={`handled-driver-${props.groupId}`} mb="0" style={{display:'flex', alignItems: 'center'}}>
                    <FaTruck style={{marginRight: '10px'}}/>Handled to delivery driver?
                </FormLabel>
                <Switch
                    id={`handled-driver-${props.groupId}`}
                    onChange={(ev) =>
                        toggleHandledToDriver(ev.target.checked, props.orders)
                    }
                    isChecked={handledToDriver}
                    isDisabled={handledToDriverLoading}
                />
                {handledToDriverLoading && <Spinner size="sm" ml={3} />}
            </FormControl>

            {/*
                    
            ##### ##### ####  ##### ##### #####  ###  ##### ####  
            #   # #   # #   # #     #   # #     ## ## #   # #   # 
            #   # ##### #   # ##### ##### #     #   # ##### #   # 
            #   # #  #  #   # #     #  #  #     ##### #  #  #   # 
            ##### #   # ####  ##### #   # ##### #   # #   # ####  
            
            */}

            <Heading as="h5" size="md" mt='5'>
                Items
            </Heading>

            {props.orders.map((order, index) => (
                <OrderCard
                    key={`${props.groupId}-${index}`}
                    order={order}
                    deliveryDate={deliveryDate}
                    deliveryTime={deliveryTime}
                />
            ))}

            <Flex align="flex-end" direction="column">
                <Flex align="flex-end" justify="flex-end">
                    <Text>
                        Subtotal: ${totalSum.toString()}
                        {props.comission > 0 && (
                            <> &bull; Comission {props.comission * 100}%</>
                        )}
                    </Text>
                </Flex>
                {props.comission > 0 && (
                    <Flex align="flex-end" justify="flex-end">
                        <Tag>Payment: ${totalPayment}</Tag>
                    </Flex>
                )}
            </Flex>
        </div>
	);
};
