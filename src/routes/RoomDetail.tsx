import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {checkRoomBooking, getRoom, getRoomReviews, getRoomAmenities} from '../api';
import {IAmenity, IReview, IRoomDetail} from '../types';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import type {Value} from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';
import '../calendar.css';
import {FaStar} from 'react-icons/fa';
import {useState} from 'react';
import {Helmet} from 'react-helmet';

export default function RoomDetail() {
  const {roomPk} = useParams();
  const {isLoading, data} = useQuery<IRoomDetail>({
    queryKey: [`rooms`, roomPk],
    queryFn: getRoom,
  });
  const {data: reviewsData, isLoading: isReviewsLoading} = useQuery<IReview[]>({
    queryKey: [`rooms`, roomPk, `reviews`],
    queryFn: getRoomReviews,
  });
  const {data: amenities, isLoading: isAmenitiesLoading} = useQuery<IAmenity[]>({
    queryKey: ['amenities', roomPk],
    queryFn: getRoomAmenities,
  });
  const [dates, setDates] = useState<Date[]>();
  const {data: checkBookingData, isLoading: isCheckingBooking} = useQuery({
    queryKey: ['check', roomPk, dates],
    queryFn: checkRoomBooking,
    enabled: dates !== undefined,
    gcTime: 0,
  });
  return (
    <Box
      mt={'10'}
      px={{
        sm: 10,
        lg: 20,
      }}
    >
      <Helmet>
        <title>{data ? data.name : 'loading...'}</title>
      </Helmet>
      <Skeleton height={'43px'} width={'100%'} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
        <Box>
          <Text>
            {data?.country}, {data?.city}
          </Text>
        </Box>
      </Skeleton>
      <Grid
        mt={10}
        rounded={'xl'}
        overflow={'hidden'}
        gap={2}
        height="60vh"
        templateRows={'1fr 1fr'}
        templateColumns={'repeat(4, 1fr)'}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1} overflow={'hidden'} key={index}>
            <Skeleton isLoaded={!isLoading} h={'100%'} w={'100%'}>
              {data?.photos && data.photos.length > 0 ? (
                <Image objectFit={'cover'} w={'100%'} h={'100%'} src={data?.photos[index].file} />
              ) : (
                <Image src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg" />
              )}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid
        gap={10}
        templateColumns={{
          md: '1fr 1fr',
          lg: '2fr 1fr',
        }}
      >
        <Box>
          <HStack justifyContent={'space-between'} mt={10}>
            <VStack noOfLines={1} alignItems={'flex-start'}>
              <Skeleton isLoaded={!isLoading} height={'30px'}>
                <Heading fontSize={'2xl'}>House hosted by {data?.owner.username}</Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={'30px'}>
                <HStack justifyContent={'flex-start'} w={'100%'}>
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? '' : 's'}
                  </Text>
                  <Text>•</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? '' : 's'}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar name={data?.owner.username} size={'xl'} src={data?.owner.avatar} />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={'2xl'}>
              <Skeleton w={'50%'} isLoaded={!isLoading} height={'30px'}>
                <HStack>
                  <FaStar />
                  <Text>{data?.rating}</Text>
                  <Text>•</Text>
                  <Text>
                    {reviewsData?.length} review
                    {reviewsData?.length === 1 || reviewsData?.length === 0 ? '' : 's'}
                  </Text>
                </HStack>
              </Skeleton>
            </Heading>
            <Container marginX={'none'} maxW={'container.xl'} mt={10}>
              <Grid templateColumns={'repeat(2, 1fr)'} gap={10}>
                {isReviewsLoading
                  ? [1, 2, 3, 4].map((index) => (
                      <Box>
                        <VStack alignItems={'flex-start'}>
                          <HStack>
                            <Avatar size={'md'}></Avatar>
                            <VStack alignItems={'flex-start'} spacing={1}>
                              <Skeleton w={'200px'} h="25px">
                                <Heading fontSize={'md'}>Loading...</Heading>
                              </Skeleton>
                              <Skeleton w={'50px'} h="10px">
                                <HStack spacing={1}>
                                  <FaStar size={'12px'}></FaStar>
                                  <Text>Loading...</Text>
                                </HStack>
                              </Skeleton>
                            </VStack>
                          </HStack>
                          <Skeleton w={'500px'} h={'150px'}>
                            <Text>Loading...</Text>
                          </Skeleton>
                        </VStack>
                      </Box>
                    ))
                  : reviewsData?.map((review, index) => (
                      <Box>
                        <VStack spacing={3} alignItems={'flex-start'}>
                          <HStack spacing={4}>
                            <Avatar name={review.user.username} src={review.user.avatar} size={'md'}></Avatar>
                            <VStack alignItems={'flex-start'} spacing={0}>
                              <Heading fontSize={'md'}>{review.user.username}</Heading>
                              <HStack spacing={1}>
                                <FaStar size={'12px'}></FaStar>
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
        <Box pt={10}>
          <Calendar
            onChange={(value: Value) => setDates(value as Date[])}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            selectRange
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isCheckingBooking && dates !== undefined}
            my={5}
            w="100%"
            colorScheme="red"
          >
            Make booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color={'red.500'}>Can't book on those dates, sorry</Text>
          ) : null}
        </Box>
      </Grid>
      <Box>
        <Box pt={10} mb={10}>
          <Heading fontSize={'2xl'}>
            <Skeleton w={'30%'} isLoaded={!isLoading} height={'30%'}>
              <Text>Amenities</Text>
            </Skeleton>
          </Heading>
          <Container marginX={0} maxW={'container.xl'}>
            <Skeleton w={'100%'} isLoaded={!isLoading} height={'30px'}>
              <Grid mt={3} gap={5} templateColumns={'repeat(2, 1fr)'}>
                {amenities &&
                  amenities.map((amenity, index) => (
                    <>
                      <VStack spacing={2} alignItems={'flex-start'}>
                        <Text fontSize={18} key={index}>
                          {amenity.name}
                        </Text>
                        <Text>: {amenity.description ? amenity.description : amenity.name}</Text>
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
