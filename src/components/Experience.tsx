import {
  Box,
  Button,
  Grid,
  Image,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IExperienceProps {
  imageUrl: string;
  name: string;
  rating: number | string;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Experience({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  pk,
  isOwner,
}: IExperienceProps) {
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/experiences/${pk}/photos`);
  };
  return (
    <Link to={`/experiences/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box
          w={"100%"}
          position={"relative"}
          overflow={"hidden"}
          mb={3}
          rounded={"2xl"}
        >
          {imageUrl ? (
            <Image objectFit={"cover"} minH={"250"} src={imageUrl} />
          ) : (
            <Box minH={"280px"} h={"100%"} w={"100%"} p={10} bg={"green.400"} />
          )}
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={-2}
            onClick={onCameraClick}
            color={"white"}
            _hover={{
              color: "red.500",
            }}
          >
            {isOwner ? (
              <FaCamera size={"20px"} />
            ) : (
              <FaRegHeart size={"20px"} />
            )}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"1fr 1fr"}>
            <Text display={"block"} noOfLines={1} as={"b"} fontSize={"md"}>
              {name}
            </Text>
            <HStack alignItems={"center"} spacing={1}>
              {rating === "" ? "" : <FaStar size={12} />}
              <Text fontSize={"sm"}>{rating === "" ? "" : rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={"gray"}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={"gray"}>
          <Text as={"b"}>${price} / 회</Text>
        </Text>
      </VStack>
    </Link>
  );
}
