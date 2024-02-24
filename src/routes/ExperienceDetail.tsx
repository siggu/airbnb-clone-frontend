import { useQuery } from "@tanstack/react-query";
import {
  getExperience,
  getExperiencePerks,
  getExperienceReviews,
} from "../api";
import { IExperienceDetail, IPerk, IReview } from "../types";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Text,
  Image,
  HStack,
  VStack,
  Avatar,
  Container,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function ExperienceDetail() {
  const { experiencePk } = useParams();
  const { data, isLoading } = useQuery<IExperienceDetail>({
    queryKey: ["experiences", experiencePk],
    queryFn: getExperience,
  });
  const { data: reivewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >({
    queryKey: ["experiences", experiencePk, "reviews"],
    queryFn: getExperienceReviews,
  });
  const { data: perks, isLoading: isPerksLoading } = useQuery<IPerk[]>({
    queryKey: ["experiences", experiencePk, "perks"],
    queryFn: getExperiencePerks,
  });
  return (
    <Box
      mt={"10"}
      px={{
        sm: 10,
        lg: 20,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width={"100%"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
        <Box>
          <Text>
            {data?.country}, {data?.city}
          </Text>
        </Box>
      </Skeleton>
      <Grid
        mt={10}
        rounded={"xl"}
        overflow={"hidden"}
        gap={2}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton height={"100%"} width={"100%"} isLoaded={!isLoading}>
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w={"100%"}
                  h={"100%"}
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid
        gap={10}
        templateColumns={{
          md: "1fr 1fr",
          lg: "2fr 1fr",
        }}
      >
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack noOfLines={1} alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} h={"30px"}>
                <Heading fontSize={"2xl"}>
                  Experience hosted by {data?.host.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} h={"30px"}>
                <HStack justifyContent={"flex-start"} w={"100%"}>
                  <Text>${data?.price} / 회</Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.host.username}
              size={"xl"}
              src={data?.host.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <Skeleton w={"50%"} isLoaded={!isLoading} height={"30px"}>
                <HStack>
                  <FaStar />
                  <Text>{data?.rating}</Text>
                  <Text>•</Text>
                  <Text>
                    {reivewsData?.length} review
                    {reivewsData?.length === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </Heading>
            <Container marginX={"none"} maxW={"container.xl"} mt={10}>
              <Grid templateColumns={"repeat(2, 1fr)"} gap={10}>
                {isReviewsLoading
                  ? [0, 1, 2, 3].map((index) => (
                      <Box>
                        <VStack alignItems={"flex-start"}>
                          <HStack>
                            <Avatar size={"md"} />
                            <VStack alignItems={"flex-start"} spacing={1}>
                              <Skeleton w={"200px"} h={"25px"}>
                                <Heading fontSize={"mx"}>Loading...</Heading>
                              </Skeleton>
                              <Skeleton w={"50px"} h={"10px"}>
                                <HStack spacing={1}>
                                  <FaStar size={"12px"}></FaStar>
                                  <Text>Loading...</Text>
                                </HStack>
                              </Skeleton>
                            </VStack>
                          </HStack>
                          <Skeleton w={"500px"} h={"150px"}>
                            <Text>Loading...</Text>
                          </Skeleton>
                        </VStack>
                      </Box>
                    ))
                  : reivewsData?.map((review, index) => (
                      <Box>
                        <VStack spacing={3} alignItems={"flex-start"}>
                          <HStack spacing={4}>
                            <Avatar
                              name={review.user.name}
                              src={review.user.avatar}
                              size={"md"}
                            ></Avatar>
                            <VStack alignItems={"flex-start"} spacing={0}>
                              <Heading fontSize={"md"}>
                                {review.user.username}
                              </Heading>
                              <HStack spacing={1}>
                                <FaStar size={"12px"}></FaStar>
                                <Text>{review.rating}</Text>
                              </HStack>
                            </VStack>
                          </HStack>
                          <Text>{review.payload}</Text>
                        </VStack>
                      </Box>
                    ))}
              </Grid>
            </Container>
          </Box>
        </Box>
      </Grid>
      <Box>
        <Box pt={10} mb={10}>
          <Skeleton w={"30%"} isLoaded={!isLoading} height={"30%"}>
            <Heading fontSize={"2xl"}>Perks</Heading>
          </Skeleton>
          <Container marginX={0} maxW={"container.xl"}>
            <Skeleton w={"100%"} isLoaded={!isLoading} height={"30px"}>
              <Grid mt={3} gap={5} templateColumns={"repeat(2, 1fr)"}>
                {perks &&
                  perks.map((perk, index) => (
                    <>
                      <VStack spacing={2} alignItems={"flex-start"}>
                        <Text fontSize={18} key={index}>
                          {perk.name}
                        </Text>
                        <Text>- {perk.detail ? perk.detail : perk.name}</Text>
                        <Text>
                          - {perk.explanation ? perk.explanation : perk.name}
                        </Text>
                      </VStack>
                    </>
                  ))}
              </Grid>
            </Skeleton>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
