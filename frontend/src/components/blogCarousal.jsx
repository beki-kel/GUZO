import { Carousel } from "@material-tailwind/react";
import {Card,CardHeader,CardBody,Typography,Avatar,} from "@material-tailwind/react";
export function CarouselCustomNavigation() {
return (
    <Carousel
        loop
        navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
                <span
                key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-black" : "w-4 bg-gray-500"
            }`}
            onClick={() => setActiveIndex(i)}
            />
        ))}
        </div>
    )}
    >
        <div className="h-full w-full flex space-x-4  items-center px-20 pb-10">
            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>
        </div>

        <div className="h-full w-full flex space-x-4  items-center px-20 py-10">
            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4  text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>
        </div>
        <div className="h-full w-full flex space-x-4  items-center px-20 py-10">
            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>

            <Card shadow={false} className="relative grid h-[30rem] w-1/4 max-w-[24rem] items-end justify-center overflow-hidden text-center">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-10 px-3 md:px-12">
                <Typography
                variant="h4"
                color="white"
                className="mb-2 font-semibold leading-[1.5] font-serif"
                >
                Harar is a city in eastern Ethiopia. It’s surrounded by a centuries-old defensive wall that has several large gates, including Duke's Gate.
                </Typography>
                <Typography variant="h5" className="mb-4 text-orange-800">
                    Exopia
                </Typography>
                <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
            </CardBody>
            </Card>
        </div>
    </Carousel>
);
}